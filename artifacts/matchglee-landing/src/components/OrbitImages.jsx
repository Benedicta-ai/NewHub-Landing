import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";

import "./OrbitImages.css";

function generateEllipsePath(cx, cy, rx, ry) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx, cy, radius) {
  return generateEllipsePath(
    cx,
    cy,
    radius,
    radius,
  );
}

function generateSquarePath(cx, cy, size) {
  const half = size / 2;

  return `M ${cx - half} ${cy - half} L ${cx + half} ${cy - half} L ${cx + half} ${cy + half} L ${cx - half} ${cy + half} Z`;
}

function generateRectanglePath(
  cx,
  cy,
  width,
  height,
) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${cx - halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy - halfHeight} L ${cx + halfWidth} ${cy + halfHeight} L ${cx - halfWidth} ${cy + halfHeight} Z`;
}

function generateTrianglePath(cx, cy, size) {
  const height =
    (size * Math.sqrt(3)) / 2;

  const halfSize = size / 2;

  return `M ${cx} ${cy - height / 1.5} L ${cx + halfSize} ${cy + height / 3} L ${cx - halfSize} ${cy + height / 3} Z`;
}

function generateStarPath(
  cx,
  cy,
  outerRadius,
  innerRadius,
  points,
) {
  const step = Math.PI / points;
  let path = "";

  for (
    let index = 0;
    index < points * 2;
    index += 1
  ) {
    const radius =
      index % 2 === 0
        ? outerRadius
        : innerRadius;

    const angle =
      index * step - Math.PI / 2;

    const x =
      cx + radius * Math.cos(angle);

    const y =
      cy + radius * Math.sin(angle);

    path +=
      index === 0
        ? `M ${x} ${y}`
        : ` L ${x} ${y}`;
  }

  return `${path} Z`;
}

function generateHeartPath(cx, cy, size) {
  const scale = size / 30;

  return `M ${cx} ${cy + 12 * scale} C ${cx - 20 * scale} ${cy - 5 * scale}, ${cx - 12 * scale} ${cy - 18 * scale}, ${cx} ${cy - 8 * scale} C ${cx + 12 * scale} ${cy - 18 * scale}, ${cx + 20 * scale} ${cy - 5 * scale}, ${cx} ${cy + 12 * scale}`;
}

function generateInfinityPath(
  cx,
  cy,
  width,
  height,
) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${cx} ${cy} C ${cx + halfWidth * 0.5} ${cy - halfHeight}, ${cx + halfWidth} ${cy - halfHeight}, ${cx + halfWidth} ${cy} C ${cx + halfWidth} ${cy + halfHeight}, ${cx + halfWidth * 0.5} ${cy + halfHeight}, ${cx} ${cy} C ${cx - halfWidth * 0.5} ${cy + halfHeight}, ${cx - halfWidth} ${cy + halfHeight}, ${cx - halfWidth} ${cy} C ${cx - halfWidth} ${cy - halfHeight}, ${cx - halfWidth * 0.5} ${cy - halfHeight}, ${cx} ${cy}`;
}

function generateWavePath(
  cx,
  cy,
  width,
  amplitude,
  waves,
) {
  const points = [];
  const segments = waves * 20;
  const halfWidth = width / 2;

  for (
    let index = 0;
    index <= segments;
    index += 1
  ) {
    const x =
      cx -
      halfWidth +
      (width * index) / segments;

    const y =
      cy +
      Math.sin(
        (index / segments) *
          waves *
          2 *
          Math.PI,
      ) *
        amplitude;

    points.push(
      index === 0
        ? `M ${x} ${y}`
        : `L ${x} ${y}`,
    );
  }

  for (
    let index = segments;
    index >= 0;
    index -= 1
  ) {
    const x =
      cx -
      halfWidth +
      (width * index) / segments;

    const y =
      cy -
      Math.sin(
        (index / segments) *
          waves *
          2 *
          Math.PI,
      ) *
        amplitude;

    points.push(`L ${x} ${y}`);
  }

  return `${points.join(" ")} Z`;
}

function OrbitItem({
  item,
  index,
  totalItems,
  path,
  itemSize,
  rotation,
  progress,
  fill,
  interactive,
  selectedIndex,
  onItemClick,
}) {
  const itemOffset = fill
    ? (index / totalItems) * 100
    : 0;

  const offsetDistance = useTransform(
    progress,
    (currentProgress) => {
      const offset =
        ((currentProgress + itemOffset) %
          100 +
          100) %
        100;

      return `${offset}%`;
    },
  );

  const isSelected =
    selectedIndex === index;

  const className = [
    "orbit-item",
    interactive
      ? "orbit-item--interactive"
      : "",
    isSelected
      ? "orbit-item--selected"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    width: itemSize,
    height: itemSize,
    offsetPath: `path("${path}")`,
    offsetRotate: "0deg",
    offsetAnchor: "center center",
    offsetDistance,
  };

  const content = (
    <div
      className="orbit-item-upright"
      style={{
        transform: `rotate(${-rotation}deg)`,
      }}
    >
      <div className="orbit-item-visual">
        {item}
      </div>
    </div>
  );

  if (interactive) {
    return (
      <motion.button
        type="button"
        className={className}
        style={style}
        data-orbit-interactive="true"
        aria-label={item.props.alt}
        aria-pressed={isSelected}
        onClick={(event) => {
          event.stopPropagation();
          onItemClick?.(index);
        }}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
    >
      {content}
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  items = [],
  altPrefix = "Orbiting image",
  shape = "ellipse",
  customPath,
  baseWidth = 1400,
  baseHeight = 700,
  aspectRatio = "2 / 1",
  radiusX = 500,
  radiusY = 120,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 80,
  direction = "normal",
  fill = true,
  width = 100,
  height = 100,
  className = "",
  showPath = false,
  pathColor = "rgba(0,0,0,0.1)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
  interactive = false,
  selectedIndex = null,
  onItemClick,
}) {
  const containerRef = useRef(null);

  const [scale, setScale] =
    useState(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseHeight / 2;

  const path = useMemo(() => {
    switch (shape) {
      case "circle":
        return generateCirclePath(
          designCenterX,
          designCenterY,
          radius,
        );

      case "square":
        return generateSquarePath(
          designCenterX,
          designCenterY,
          radius * 2,
        );

      case "rectangle":
        return generateRectanglePath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY * 2,
        );

      case "triangle":
        return generateTrianglePath(
          designCenterX,
          designCenterY,
          radius * 2,
        );

      case "star":
        return generateStarPath(
          designCenterX,
          designCenterY,
          radius,
          radius * starInnerRatio,
          starPoints,
        );

      case "heart":
        return generateHeartPath(
          designCenterX,
          designCenterY,
          radius * 2,
        );

      case "infinity":
        return generateInfinityPath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY * 2,
        );

      case "wave":
        return generateWavePath(
          designCenterX,
          designCenterY,
          radiusX * 2,
          radiusY,
          3,
        );

      case "custom":
        return (
          customPath ||
          generateEllipsePath(
            designCenterX,
            designCenterY,
            radiusX,
            radiusY,
          )
        );

      case "ellipse":
      default:
        return generateEllipsePath(
          designCenterX,
          designCenterY,
          radiusX,
          radiusY,
        );
    }
  }, [
    shape,
    customPath,
    designCenterX,
    designCenterY,
    radiusX,
    radiusY,
    radius,
    starPoints,
    starInnerRatio,
  ]);

  useLayoutEffect(() => {
    if (
      !responsive ||
      !containerRef.current
    ) {
      return;
    }

    const updateScale = () => {
      if (!containerRef.current) {
        return;
      }

      const widthScale =
        containerRef.current.clientWidth /
        baseWidth;

      const heightScale =
        containerRef.current.clientHeight /
        baseHeight;

      setScale(
        Math.min(
          widthScale,
          heightScale,
        ),
      );
    };

    updateScale();

    const observer =
      new ResizeObserver(updateScale);

    observer.observe(
      containerRef.current,
    );

    return () => {
      observer.disconnect();
    };
  }, [
    responsive,
    baseWidth,
    baseHeight,
  ]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) {
      return;
    }

    const startingPoint =
      progress.get();

    const destination =
      startingPoint +
      (direction === "reverse"
        ? -100
        : 100);

    const controls = animate(
      progress,
      destination,
      {
        duration,
        ease: easing,
        repeat: Infinity,
        repeatType: "loop",
      },
    );

    return () => {
      controls.stop();
    };
  }, [
    progress,
    duration,
    easing,
    direction,
    paused,
  ]);

  const normalizedItems = useMemo(() => {
    if (items.length > 0) {
      return items;
    }

    return images.map(
      (src, index) => ({
        src,
        alt: `${altPrefix} ${index + 1}`,
      }),
    );
  }, [
    items,
    images,
    altPrefix,
  ]);

  const orbitItems =
    normalizedItems.map(
      (item, index) => (
        <img
          key={`${item.src}-${index}`}
          src={item.src}
          alt={
            item.alt ||
            `${altPrefix} ${index + 1}`
          }
          draggable={false}
          loading="lazy"
          decoding="async"
          className="orbit-image"
        />
      ),
    );

  const containerWidth = responsive
    ? "100%"
    : typeof width === "number"
      ? `${width}px`
      : width;

  const containerHeight = responsive
    ? "auto"
    : typeof height === "number"
      ? `${height}px`
      : height;

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive
          ? aspectRatio
          : undefined,
      }}
      aria-hidden={
        interactive
          ? undefined
          : true
      }
    >
      <div
        className={
          responsive
            ? "orbit-scaling-container orbit-scaling-container--responsive"
            : "orbit-scaling-container"
        }
        style={{
          width: responsive
            ? baseWidth
            : "100%",

          height: responsive
            ? baseHeight
            : "100%",

          transform:
            responsive &&
            scale !== null
              ? `translate(-50%, -50%) scale(${scale})`
              : undefined,

          visibility:
            responsive &&
            scale === null
              ? "hidden"
              : undefined,
        }}
      >
        <div
          className="orbit-rotation-wrapper"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${baseWidth} ${baseHeight}`}
              className="orbit-path-svg"
            >
              <path
                d={path}
                fill="none"
                stroke={pathColor}
                strokeWidth={
                  pathWidth /
                  (scale ?? 1)
                }
              />
            </svg>
          )}

          {orbitItems.map(
            (item, index) => (
              <OrbitItem
                key={index}
                item={item}
                index={index}
                totalItems={
                  orbitItems.length
                }
                path={path}
                itemSize={itemSize}
                rotation={rotation}
                progress={progress}
                fill={fill}
                interactive={interactive}
                selectedIndex={
                  selectedIndex
                }
                onItemClick={
                  onItemClick
                }
              />
            ),
          )}
        </div>
      </div>

      {centerContent && (
        <div className="orbit-center-content">
          {centerContent}
        </div>
      )}
    </div>
  );
}
