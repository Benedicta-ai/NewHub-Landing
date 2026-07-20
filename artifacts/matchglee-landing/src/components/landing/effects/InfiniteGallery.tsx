// Infinity Canvas — Originkit
// Using component defaults.

"use client"

const useIsStaticRenderer = () => false
import { useMotionValue } from "framer-motion"
import * as React from "react"
import { useEffect, useMemo, useRef } from "react"

// Official prop schema:
//   { url, width, height } — intrinsic dims kept for the image array, but tile
//   imageWidth/imageHeight define the base long-edge size; each tile keeps the
//   source image's intrinsic aspect ratio and receives a deterministic random size.
export type GalleryImage = {
    src: string
    srcSet?: string
    alt?: string
    width?: number
    height?: number
}

interface InfiniteGalleryProps {
    width?: string | number
    height?: string | number
    className?: string
    images: GalleryImage[]
    density: number
    imageWidth: number
    imageHeight: number
    rounded: number
    dragSpeed: number
    driftAmount: number
    friction: number
    backgroundColor: string
    active?: boolean
    style?: React.CSSProperties
}

const DEFAULT_IMAGES: GalleryImage[] = [
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800",
        alt: "Coverflow card 1",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800",
        alt: "Coverflow card 2",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800",
        alt: "Coverflow card 3",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800",
        alt: "Coverflow card 4",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800",
        alt: "Coverflow card 5",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800",
        alt: "Coverflow card 6",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800",
        alt: "Coverflow card 7",
    },
    {
        src: "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800",
        alt: "Coverflow card 8",
    },
]

// ---- deterministic PRNG infrastructure --------------------------------------

// Mix three integer coordinates + a salt into a uint32. Used to seed each cell.
// Based on the integer hash from "Optimized Spatial Hashing for Collision
// Detection of Deformable Objects" (Teschner et al.) with extra avalanching.
function hash3(cx: number, cy: number, cz: number, salt: number) {
    let h = (cx | 0) * 0x8da6b343
    h ^= Math.imul(cy | 0, 0xd8163841)
    h ^= Math.imul(cz | 0, 0xcb1ab31f)
    h ^= salt | 0
    h ^= h >>> 16
    h = Math.imul(h, 0x7feb352d)
    h ^= h >>> 15
    h = Math.imul(h, 0x846ca68b)
    h ^= h >>> 16
    return h >>> 0
}

// mulberry32 — small, fast, good enough for layout jitter.
function mulberry32(seed: number) {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

// Linear interpolation toward target with frame-rate-independent smoothing.
// `t` is a 0..1 weight applied per frame; we run at ~60fps so 0.1–0.2 feels right.
function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
}

// One tile, deterministically derived from its cell + slot index + octave.
// bakedScale is an intrinsic depth property assigned once at scatter time and
// never recomputed on scroll. Within a single octave layer, every tile
// transforms by the same global scale factor — this eliminates the "dance".
type Tile = {
    // World-space center (in world units, in this octave's coordinate frame).
    wx: number
    wy: number
    // Cell + slot + octave identity (used as a stable DOM key).
    cx: number
    cy: number
    slot: number
    octave: number
    // Image index into the images array.
    imgIdx: number
    // Rendered footprint in world units (imageWidth/imageHeight ÷ PX_PER_UNIT).
    w: number
    h: number
    // Small layout-stable rotation in degrees.
    rot: number
    // Intrinsic aesthetic depth. Multiplied by the octave's effective scale to
    // get the final on-screen scale. Drawn from [scaleMin, scaleMax] at scatter
    // time — small values look "further away", larger values look "closer".
    bakedScale: number
}

// Pixel-per-world-unit. World units are abstract; we render at this scale.
const PX_PER_UNIT = 6

// Slightly tighter cells keep the canvas visually populated while the
// deterministic sub-cell scatter still prevents a rigid grid appearance.
const CELL_SIZE = 94

// Safety cap on how many cells we step out from the camera per axis, so a small
// layer scale can't request an unbounded grid.
const MAX_RANGE = 20

/**
 * InfiniteGallery — flat-plane infinite gallery with TRUE infinite zoom.
 *
 * Zoom model — "octave-swap":
 *
 *  - The user input drives `logZoom`, a free-ranging scalar that accumulates
 *    from the wheel (positive = zooming in). Effective zoom = 2^logZoom.
 *  - At any moment we pick the "current" octave = floor(logZoom), and the
 *    fractional remainder frac = logZoom - octave is in [0, 1).
 *  - Two cell grids are rendered SIMULTANEOUSLY (current + next octave), cross-
 *    faded so tile sizes stay in a roughly constant band: bakedScale × [0.5,2).
 *    No matter how long the user zooms, tiles never grow huge or shrink to
 *    nothing — classic zoom-quilt feel.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 600
 */
export default function InfiniteGallery(props: InfiniteGalleryProps) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const {
        width,
        height,
        className,
        images,
        density,
        imageWidth,
        imageHeight,
        rounded,
        dragSpeed,
        driftAmount,
        friction,
        backgroundColor,
        active,
        style,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<HTMLDivElement | null>(null)
    const isStatic = useIsStaticRenderer()
    const isInteractive = active !== false

    // Clamp props into their official ranges.
    const safeImages =
        Array.isArray(images) && images.length > 0 ? images : DEFAULT_IMAGES
    const safeDensity = Math.max(1, Math.min(15, Math.floor(density || 5)))
    const safeImageWidth = Math.max(8, Math.min(4000, imageWidth || 150))
    const safeImageHeight = Math.max(8, Math.min(4000, imageHeight || 150))
    const safeRounded = Math.max(0, Math.min(20, rounded ?? 3))
    // Sliders carry whole-number panel values; divide back to working ranges.
    const safeDragSpeed = Math.max(0.1, Math.min(5, (dragSpeed || 20) / 20))
    const safeDriftAmount = Math.max(0, Math.min(20, driftAmount ?? 8))
    // Friction 1..20 → per-frame velocity RETENTION. 1 = least friction (glides
    // on, retention ~0.985), 20 = most friction (stops quickly, retention 0.7).
    const safeFriction =
        1 - (Math.max(1, Math.min(20, friction ?? 10)) / 20) * 0.3

    // ---- Camera & input state (motion values; no React re-renders per frame) -

    const targetX = useMotionValue(0)
    const targetY = useMotionValue(0)
    const camX = useMotionValue(0)
    const camY = useMotionValue(0)
    const velX = useMotionValue(0)
    const velY = useMotionValue(0)

    const targetLogZoom = useMotionValue(0)
    const logZoom = useMotionValue(0)
    const velLogZoom = useMotionValue(0)

    const driftTX = useMotionValue(0)
    const driftTY = useMotionValue(0)
    const driftX = useMotionValue(0)
    const driftY = useMotionValue(0)

    // ---- Cell generation -----------------------------------------------------

    const subN = Math.max(1, Math.ceil(Math.sqrt(safeDensity)))
    const subSize = CELL_SIZE / subN
    const effectivePerCell = Math.min(safeDensity, subN * subN)

    const imagesCount = safeImages.length

    // The intrinsic tile dimensions now carry most of the visual variation.
    // This smaller scale range preserves smooth zooming without flattening the
    // deliberately random card sizes.
    const SCALE_MIN = 0.9
    const SCALE_MAX = 1.12

    const generateCell = useMemo(() => {
        return (gx: number, gy: number, octave: number): Tile[] => {
            const seed = hash3(gx, gy, octave | 0, 0x9e3779b1)
            const rand = mulberry32(seed)

            const totalSubs = subN * subN
            const subs = new Array<number>(totalSubs)
            for (let i = 0; i < totalSubs; i++) subs[i] = i
            for (let i = totalSubs - 1; i > 0; i--) {
                const j = Math.floor(rand() * (i + 1))
                const tmp = subs[i]
                subs[i] = subs[j]
                subs[j] = tmp
            }

            const tiles: Tile[] = []
            const count = Math.min(effectivePerCell, totalSubs)

            const cellX0 = gx * CELL_SIZE
            const cellY0 = gy * CELL_SIZE

            // A wider deterministic jitter makes the cards feel freely scattered
            // rather than aligned to a visible grid.
            const jitterRange = subSize * 0.58
            const baseLongSide = Math.max(safeImageWidth, safeImageHeight)

            for (let slot = 0; slot < count; slot++) {
                const subIdx = subs[slot]
                const sx = subIdx % subN
                const sy = Math.floor(subIdx / subN)

                const wx =
                    cellX0 +
                    (sx + 0.5) * subSize +
                    (rand() - 0.5) * jitterRange
                const wy =
                    cellY0 +
                    (sy + 0.5) * subSize +
                    (rand() - 0.5) * jitterRange

                // Assign images from global sub-cell coordinates. Immediate
                // horizontal, vertical and diagonal neighbours always receive
                // different images, while distant repetitions remain possible.
                const globalSubX = gx * subN + sx
                const globalSubY = gy * subN + sy
                const imageSequence =
                    globalSubX * 7 + globalSubY * 11 + octave * 13
                const imgIdx =
                    imagesCount > 0
                        ? ((imageSequence % imagesCount) + imagesCount) % imagesCount
                        : 0

                const source = safeImages[imgIdx]
                const intrinsicWidth =
                    source?.width && source.width > 0 ? source.width : safeImageWidth
                const intrinsicHeight =
                    source?.height && source.height > 0 ? source.height : safeImageHeight
                const aspect = Math.max(
                    0.42,
                    Math.min(2.4, intrinsicWidth / intrinsicHeight)
                )

                // Each tile receives its own deterministic size. The long edge
                // ranges from roughly 65% to 155% of the configured base size.
                const longSidePx =
                    baseLongSide * (0.65 + rand() * 0.9)

                const widthPx =
                    aspect >= 1 ? longSidePx : longSidePx * aspect
                const heightPx =
                    aspect >= 1 ? longSidePx / aspect : longSidePx

                const bakedScale =
                    SCALE_MIN + rand() * (SCALE_MAX - SCALE_MIN)

                tiles.push({
                    wx,
                    wy,
                    cx: gx,
                    cy: gy,
                    slot,
                    octave,
                    imgIdx,
                    w: widthPx / PX_PER_UNIT,
                    h: heightPx / PX_PER_UNIT,
                    rot: 0,
                    bakedScale,
                })
            }

            return tiles
        }
    }, [
        safeImages,
        imagesCount,
        safeImageWidth,
        safeImageHeight,
        subN,
        subSize,
        effectivePerCell,
    ])

    // ---- Per-frame loop -----------------------------------------------------

    useEffect(() => {
        const scene = sceneRef.current
        const container = containerRef.current
        if (!scene) return

        // Cache the container size; the visible cell range is derived from it so
        // the whole screen is always filled (no fixed "view range").
        let cW = container ? container.clientWidth || 900 : 900
        let cH = container ? container.clientHeight || 600 : 600
        const ro = new ResizeObserver(() => {
            if (container) {
                cW = container.clientWidth || cW
                cH = container.clientHeight || cH
            }
        })
        if (container) ro.observe(container)

        const layerPools = new Map<
            number,
            {
                tileEls: Map<string, HTMLDivElement>
                imgEls: Map<string, HTMLImageElement>
            }
        >()

        const getPool = (octave: number) => {
            let pool = layerPools.get(octave)
            if (!pool) {
                pool = { tileEls: new Map(), imgEls: new Map() }
                layerPools.set(octave, pool)
            }
            return pool
        }

        const disposeLayer = (octave: number) => {
            const pool = layerPools.get(octave)
            if (!pool) return
            pool.tileEls.forEach((el) => {
                if (el.parentNode === scene) scene.removeChild(el)
            })
            pool.tileEls.clear()
            pool.imgEls.clear()
            layerPools.delete(octave)
        }

        const disposeAllLayers = () => {
            Array.from(layerPools.keys()).forEach(disposeLayer)
        }

        const removeTile = (octave: number, key: string) => {
            const pool = layerPools.get(octave)
            if (!pool) return
            const el = pool.tileEls.get(key)
            if (el && el.parentNode === scene) scene.removeChild(el)
            pool.tileEls.delete(key)
            pool.imgEls.delete(key)
        }

        const ensureTile = (t: Tile): HTMLDivElement => {
            const pool = getPool(t.octave)
            const key = `${t.cx},${t.cy},${t.slot}`
            let el = pool.tileEls.get(key)
            if (!el) {
                el = document.createElement("div")
                el.style.position = "absolute"
                el.style.left = "50%"
                el.style.top = "50%"
                el.style.transformOrigin = "0 0"
                el.style.willChange = "transform, opacity, filter"
                el.style.pointerEvents = "none"
                el.style.overflow = "hidden"
                el.style.background = "none"
                el.style.backgroundColor = "transparent"
                el.style.boxShadow = "0 14px 38px rgba(24, 12, 42, 0.18)"
                el.dataset.tileKey = key

                const source = safeImages[t.imgIdx]
                const image = document.createElement("img")
                image.src = source?.src || ""
                if (source?.srcSet) image.srcset = source.srcSet
                image.alt = source?.alt || ""
                image.draggable = false
                image.style.position = "absolute"
                image.style.inset = "0"
                image.style.width = "100%"
                image.style.height = "100%"

                // The wrapper uses the image's intrinsic aspect ratio, so contain
                // displays the original asset exactly: no crop, no blurred fill,
                // no alternate square version and no letterbox background.
                image.style.objectFit = "cover"
                image.style.background = "transparent"
                image.style.backgroundColor = "transparent"
                image.style.display = "block"
                image.style.pointerEvents = "none"
                image.style.userSelect = "none"

                el.appendChild(image)

                scene.appendChild(el)
                pool.tileEls.set(key, el)
                pool.imgEls.set(key, image)
            }
            return el
        }

        // Project & render ONE OCTAVE LAYER.
        const projectLayer = (
            octave: number,
            layerScale: number,
            layerAlpha: number,
            layerZBase: number,
            cx: number,
            cy: number
        ) => {
            const pool = getPool(octave)

            const camCellX = Math.floor(cx / CELL_SIZE)
            const camCellY = Math.floor(cy / CELL_SIZE)

            // Cells needed to cover the whole viewport at this layer's scale.
            // World half-extent visible = (px half) / (PX_PER_UNIT * layerScale).
            // +1 cell of margin so tiles straddling the edge still render.
            const worldHalfX = cW / 2 / (PX_PER_UNIT * layerScale)
            const worldHalfY = cH / 2 / (PX_PER_UNIT * layerScale)
            const rangeX = Math.min(
                MAX_RANGE,
                Math.ceil(worldHalfX / CELL_SIZE) + 1
            )
            const rangeY = Math.min(
                MAX_RANGE,
                Math.ceil(worldHalfY / CELL_SIZE) + 1
            )

            const visibleKeys = new Set<string>()
            const tilesThisFrame: Tile[] = []

            for (let dy = -rangeY; dy <= rangeY; dy++) {
                for (let dx = -rangeX; dx <= rangeX; dx++) {
                    const tiles = generateCell(
                        camCellX + dx,
                        camCellY + dy,
                        octave
                    )
                    for (let i = 0; i < tiles.length; i++) {
                        tilesThisFrame.push(tiles[i])
                    }
                }
            }

            const orderKeys: string[] = new Array(tilesThisFrame.length)
            const orderScale: number[] = new Array(tilesThisFrame.length)

            for (let i = 0; i < tilesThisFrame.length; i++) {
                const t = tilesThisFrame[i]
                const key = `${t.cx},${t.cy},${t.slot}`
                visibleKeys.add(key)

                const dxPx = (t.wx - cx) * layerScale * PX_PER_UNIT
                const dyPx = (t.wy - cy) * layerScale * PX_PER_UNIT
                const s = t.bakedScale * layerScale

                const el = ensureTile(t)
                const img = pool.imgEls.get(key)

                const wPx = t.w * PX_PER_UNIT
                const hPx = t.h * PX_PER_UNIT

                el.style.transform = `translate3d(${dxPx}px, ${dyPx}px, 0) scale(${s}) rotate(${t.rot}deg) translate(${-wPx / 2}px, ${-hPx / 2}px)`
                el.style.width = `${wPx}px`
                el.style.height = `${hPx}px`

                // Fade and soften the complete tile before it reaches a canvas edge.
                // This prevents half-cards from being visibly chopped by overflow.
                const centerX = cW / 2 + dxPx
                const centerY = cH / 2 + dyPx
                const scaledWidth = wPx * s
                const scaledHeight = hPx * s
                const nearestEdge = Math.min(
                    centerX - scaledWidth / 2,
                    cW - (centerX + scaledWidth / 2),
                    centerY - scaledHeight / 2,
                    cH - (centerY + scaledHeight / 2)
                )
                const EDGE_FADE_DISTANCE = 170
                const edgeProgress = Math.max(
                    0,
                    Math.min(1, nearestEdge / EDGE_FADE_DISTANCE)
                )
                const softenedProgress = edgeProgress * edgeProgress * (3 - 2 * edgeProgress)

                el.style.opacity = String(layerAlpha * softenedProgress)
                el.style.filter = `blur(${(1 - softenedProgress) * 12}px)`

                // Rounded corners, same mapping as SpinImage: 0..20 → up to half
                // the short edge (a square tile becomes a circle at 20). The
                // tile transform scales this px radius along with the image.
                if (img) {
                    const radiusPx =
                        (safeRounded / 20) * (Math.min(wPx, hPx) / 2)
                    el.style.borderRadius = `${radiusPx}px`
                    img.style.borderRadius = `${radiusPx}px`
                }

                orderKeys[i] = key
                orderScale[i] = t.bakedScale
            }

            for (const key of Array.from(pool.tileEls.keys())) {
                if (!visibleKeys.has(key)) removeTile(octave, key)
            }

            const idxs = orderKeys.map((_, i) => i)
            idxs.sort((a, b) => orderScale[a] - orderScale[b])
            for (let k = 0; k < idxs.length; k++) {
                const el = pool.tileEls.get(orderKeys[idxs[k]])
                if (el) el.style.zIndex = String(layerZBase + k)
            }
        }

        let lastOctaves: Set<number> = new Set()

        const project = () => {
            const cx = camX.get()
            const cy = camY.get()
            const lz = logZoom.get()

            const octave = Math.floor(lz)
            const frac = lz - octave

            const useNextOctave = frac >= 0.5
            const activeOctave = useNextOctave ? octave + 1 : octave
            const activeScale = useNextOctave
                ? Math.pow(2, frac - 1)
                : Math.pow(2, frac)

            // Render one solid octave at a time. This prevents the washed-out,
            // duplicated image layer that appeared behind the main cards.
            projectLayer(activeOctave, activeScale, 1, 0, cx, cy)

            const nowOctaves = new Set<number>([activeOctave])
            for (const o of Array.from(lastOctaves)) {
                if (!nowOctaves.has(o)) disposeLayer(o)
            }
            for (const o of Array.from(layerPools.keys())) {
                if (!nowOctaves.has(o)) disposeLayer(o)
            }
            lastOctaves = nowOctaves
        }

        project()
        if (isStatic) {
            ro.disconnect()
            return
        }

        let raf = 0

        const loop = () => {
            // 1) Apply XY velocity (drag inertia) with friction decay.
            const tx = targetX.get() + velX.get()
            const ty = targetY.get() + velY.get()
            targetX.set(tx)
            targetY.set(ty)
            velX.set(velX.get() * safeFriction)
            velY.set(velY.get() * safeFriction)

            const vlz = velLogZoom.get()
            if (vlz !== 0) {
                targetLogZoom.set(targetLogZoom.get() + vlz)
                velLogZoom.set(vlz * safeFriction)
            }

            // 2) Smooth drift toward mouse-parallax target.
            driftX.set(
                lerp(driftX.get(), driftTX.get() * safeDriftAmount, 0.08)
            )
            driftY.set(
                lerp(driftY.get(), driftTY.get() * safeDriftAmount, 0.08)
            )

            // 3) Smooth cam toward target (+ drift), logZoom toward target.
            camX.set(lerp(camX.get(), targetX.get() + driftX.get(), 0.18))
            camY.set(lerp(camY.get(), targetY.get() + driftY.get(), 0.18))
            logZoom.set(lerp(logZoom.get(), targetLogZoom.get(), 0.18))

            project()
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            disposeAllLayers()
        }
    }, [
        generateCell,
        safeFriction,
        safeDriftAmount,
        safeRounded,
        safeImages,
        isStatic,
        camX,
        camY,
        logZoom,
        targetX,
        targetY,
        targetLogZoom,
        velX,
        velY,
        velLogZoom,
        driftX,
        driftY,
        driftTX,
        driftTY,
    ])

    // ---- Input: drag, wheel (zoom), mouse-parallax drift -------------------

    useEffect(() => {
        const el = containerRef.current
        if (!el || isStatic || !isInteractive) return

        let dragging = false
        let lastPX = 0
        let lastPY = 0
        let lastT = 0
        let pid: number | null = null

        const onDown = (e: PointerEvent) => {
            if (e.button !== 0 && e.pointerType === "mouse") return
            dragging = true
            pid = e.pointerId
            lastPX = e.clientX
            lastPY = e.clientY
            lastT = e.timeStamp
            try {
                el.setPointerCapture(e.pointerId)
            } catch {}
            el.style.cursor = "grabbing"
        }

        const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect()
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
            const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
            driftTX.set(Math.max(-1, Math.min(1, nx)))
            driftTY.set(Math.max(-1, Math.min(1, ny)))

            if (!dragging || e.pointerId !== pid) return

            const dpx = e.clientX - lastPX
            const dpy = e.clientY - lastPY

            // Match drag distance to the single octave currently on screen.
            const lz = logZoom.get()
            const frac = lz - Math.floor(lz)
            const effScale =
                frac >= 0.5 ? Math.pow(2, frac - 1) : Math.pow(2, frac)
            const dWorldX = (-dpx / (PX_PER_UNIT * effScale)) * safeDragSpeed
            const dWorldY = (-dpy / (PX_PER_UNIT * effScale)) * safeDragSpeed
            targetX.set(targetX.get() + dWorldX)
            targetY.set(targetY.get() + dWorldY)

            const dt = Math.max(1, e.timeStamp - lastT)
            const k = 16 / dt
            velX.set(dWorldX * k)
            velY.set(dWorldY * k)

            lastPX = e.clientX
            lastPY = e.clientY
            lastT = e.timeStamp
        }

        const onUp = (e: PointerEvent) => {
            if (!dragging || e.pointerId !== pid) return
            dragging = false
            pid = null
            try {
                el.releasePointerCapture(e.pointerId)
            } catch {}
            el.style.cursor = "grab"
        }

        const onCancel = (e: PointerEvent) => onUp(e)

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            let delta = e.deltaY
            if (e.deltaMode === 1) delta *= 16
            else if (e.deltaMode === 2) delta *= 400
            const step = -delta * 0.0015 * safeDragSpeed
            velLogZoom.set(velLogZoom.get() + step)
        }

        const onLeave = () => {
            driftTX.set(0)
            driftTY.set(0)
        }

        el.addEventListener("pointerdown", onDown)
        el.addEventListener("pointermove", onMove)
        el.addEventListener("pointerup", onUp)
        el.addEventListener("pointercancel", onCancel)
        el.addEventListener("wheel", onWheel, { passive: false })
        el.addEventListener("pointerleave", onLeave)

        el.style.cursor = "grab"

        return () => {
            el.removeEventListener("pointerdown", onDown)
            el.removeEventListener("pointermove", onMove)
            el.removeEventListener("pointerup", onUp)
            el.removeEventListener("pointercancel", onCancel)
            el.removeEventListener("wheel", onWheel)
            el.removeEventListener("pointerleave", onLeave)
        }
    }, [
        isStatic,
        isInteractive,
        safeDragSpeed,
        targetX,
        targetY,
        velX,
        velY,
        velLogZoom,
        logZoom,
        driftTX,
        driftTY,
    ])

    // ---- Render -------------------------------------------------------------

    const resolveDim = (
        v: string | number | undefined,
        fallback: string
    ): string => {
        if (v == null) return fallback
        if (typeof v === "number") return `${v}px`
        return v
    }

    const wrapperStyle: React.CSSProperties = {
        position: "relative",
        width: resolveDim(width, "100%"),
        height: resolveDim(height, "100%"),
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        backgroundColor,
        touchAction: isInteractive ? "none" : "pan-y",
        userSelect: "none",
        cursor: isInteractive ? "grab" : "pointer",
        ...style,
    }

    const sceneStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
    }

    return (
        <div ref={containerRef} className={className} style={wrapperStyle}>
            <div ref={sceneRef} style={sceneStyle} />
        </div>
    )
}

const COMPONENT_DEFAULTS = {
    width: "100%",
    height: "100%",
    className: "",
    images: DEFAULT_IMAGES,
    density: 5,
    imageWidth: 150,
    imageHeight: 150,
    rounded: 3,
    dragSpeed: 20,
    driftAmount: 20,
    friction: 10,
    backgroundColor: "transparent",
    active: true,
}
