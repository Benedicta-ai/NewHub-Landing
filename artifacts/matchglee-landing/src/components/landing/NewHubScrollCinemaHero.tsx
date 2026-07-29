import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface NewHubScrollCinemaHeroProps {
  onGetAccess: () => void;
}

const DESKTOP_FRAME_COUNT = 180;
const MOBILE_FRAME_COUNT = 135;

const clamp = (
  value: number,
  minimum = 0,
  maximum = 1,
) => {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
};

const getFrameUrl = (
  isMobile: boolean,
  frameIndex: number,
) => {
  const folder = isMobile
    ? "mobile"
    : "desktop";

  const frameNumber = String(
    frameIndex + 1,
  ).padStart(4, "0");

  return `/newhub-cinema/${folder}/frame-${frameNumber}.webp`;
};

const getBeatStyle = (
  progress: number,
  start: number,
  end: number,
) => {
  const fadeRange = 0.055;

  const fadeIn =
    start <= 0
      ? 1
      : clamp(
          (progress - start) /
            fadeRange,
        );

  const fadeOut =
    end >= 1
      ? 1
      : clamp(
          (end - progress) /
            fadeRange,
        );

  const opacity = Math.min(
    fadeIn,
    fadeOut,
  );

  return {
    opacity,
    visibility:
      opacity > 0.01
        ? ("visible" as const)
        : ("hidden" as const),

    transform: `translate3d(0, ${
      (1 - opacity) * 24
    }px, 0)`,
  };
};

const createLoadOrder = (
  frameCount: number,
) => {
  const order: number[] = [];
  const included = new Set<number>();

  const addFrame = (index: number) => {
    if (
      index < 0 ||
      index >= frameCount ||
      included.has(index)
    ) {
      return;
    }

    included.add(index);
    order.push(index);
  };

  /*
    Load important frames first so the visitor
    quickly receives a coarse version of the
    complete timeline.
  */
  addFrame(0);
  addFrame(frameCount - 1);

  for (
    let index = 10;
    index < frameCount;
    index += 10
  ) {
    addFrame(index);
  }

  for (
    let index = 1;
    index < frameCount;
    index += 1
  ) {
    addFrame(index);
  }

  return order;
};

export default function NewHubScrollCinemaHero({
  onGetAccess,
}: NewHubScrollCinemaHeroProps) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null,
    );

  const imagesRef = useRef<
    Array<HTMLImageElement | null>
  >([]);

  const currentFrameRef =
    useRef(0);

  const animationFrameRef =
    useRef<number | null>(null);

  const previousProgressRef =
    useRef(-1);

  const [isMobile, setIsMobile] =
    useState(false);

  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(false);

  const [progress, setProgress] =
    useState(0);

  const [loadedFrames, setLoadedFrames] =
    useState(0);

  const [framesToLoad, setFramesToLoad] =
    useState(DESKTOP_FRAME_COUNT);

  const [isReady, setIsReady] =
    useState(false);

  const drawImage = useCallback(
    (image: HTMLImageElement) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const context =
        canvas.getContext("2d", {
          alpha: false,
        });

      if (!context) {
        return;
      }

      const displayWidth =
        Math.max(
          1,
          canvas.clientWidth,
        );

      const displayHeight =
        Math.max(
          1,
          canvas.clientHeight,
        );

      /*
        The source frames already contain the required
        rendering resolution. Using devicePixelRatio here
        would enlarge a 1920px image to more than 3000px
        on some displays, making it look soft.
      */
      const pixelRatio = 1;

      const outputWidth = Math.round(
        displayWidth * pixelRatio,
      );

      const outputHeight = Math.round(
        displayHeight * pixelRatio,
      );

      if (
        canvas.width !== outputWidth ||
        canvas.height !== outputHeight
      ) {
        canvas.width = outputWidth;
        canvas.height = outputHeight;
      }

      const imageWidth =
        image.naturalWidth;

      const imageHeight =
        image.naturalHeight;

      if (
        imageWidth <= 0 ||
        imageHeight <= 0
      ) {
        return;
      }

      /*
        Draw the source using object-cover
        behaviour while preserving its ratio.
      */
      const scale = Math.max(
        canvas.width / imageWidth,
        canvas.height / imageHeight,
      );

      const drawWidth =
        imageWidth * scale;

      const drawHeight =
        imageHeight * scale;

      const drawX =
        (canvas.width - drawWidth) /
        2;

      const drawY =
        (canvas.height - drawHeight) /
        2;

      context.fillStyle = "#08010f";

      context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      context.imageSmoothingEnabled =
        true;

      context.imageSmoothingQuality =
        "high";

      context.drawImage(
        image,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      );
    },
    [isMobile],
  );

  const paintFrame = useCallback(
    (requestedIndex: number) => {
      const images = imagesRef.current;

      if (!images.length) {
        return;
      }

      const directImage =
        images[requestedIndex];

      if (directImage) {
        drawImage(directImage);
        return;
      }

      /*
        If the exact image has not loaded,
        show the nearest available frame.
      */
      for (
        let distance = 1;
        distance < images.length;
        distance += 1
      ) {
        const previousIndex =
          requestedIndex - distance;

        const nextIndex =
          requestedIndex + distance;

        if (
          previousIndex >= 0 &&
          images[previousIndex]
        ) {
          drawImage(
            images[
              previousIndex
            ] as HTMLImageElement,
          );

          return;
        }

        if (
          nextIndex < images.length &&
          images[nextIndex]
        ) {
          drawImage(
            images[
              nextIndex
            ] as HTMLImageElement,
          );

          return;
        }
      }
    },
    [drawImage],
  );

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        "(max-width: 767px)",
      );

    const motionQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    const updatePreferences = () => {
      setIsMobile(
        mobileQuery.matches,
      );

      setPrefersReducedMotion(
        motionQuery.matches,
      );
    };

    updatePreferences();

    mobileQuery.addEventListener(
      "change",
      updatePreferences,
    );

    motionQuery.addEventListener(
      "change",
      updatePreferences,
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        updatePreferences,
      );

      motionQuery.removeEventListener(
        "change",
        updatePreferences,
      );
    };
  }, []);

  useEffect(() => {
    const frameCount = isMobile
      ? MOBILE_FRAME_COUNT
      : DESKTOP_FRAME_COUNT;

    const requestedFrames =
      prefersReducedMotion
        ? [frameCount - 1]
        : createLoadOrder(
            frameCount,
          );

    let cancelled = false;
    let cursor = 0;

    imagesRef.current.forEach(
      (image) => {
        if (image) {
          image.src = "";
        }
      },
    );

    imagesRef.current =
      new Array(frameCount).fill(
        null,
      );

    currentFrameRef.current =
      prefersReducedMotion
        ? frameCount - 1
        : 0;

    previousProgressRef.current =
      -1;

    setLoadedFrames(0);
    setFramesToLoad(
      requestedFrames.length,
    );

    setIsReady(false);

    const loadFrame = (
      index: number,
    ) => {
      return new Promise<void>(
        (resolve) => {
          const image = new Image();

          image.decoding = "async";

          image.onload = () => {
            if (cancelled) {
              image.src = "";
              resolve();
              return;
            }

            imagesRef.current[index] =
              image;

            setLoadedFrames(
              (value) => value + 1,
            );

            if (
              index === 0 ||
              index ===
                frameCount - 1 ||
              index ===
                currentFrameRef.current
            ) {
              paintFrame(
                currentFrameRef.current,
              );
            }

            setIsReady(true);
            resolve();
          };

          image.onerror = () => {
            console.warn(
              `Could not load NewHub frame ${index + 1}.`,
            );

            resolve();
          };

          image.src = getFrameUrl(
            isMobile,
            index,
          );
        },
      );
    };

    const worker = async () => {
      while (
        !cancelled &&
        cursor <
          requestedFrames.length
      ) {
        const frameIndex =
          requestedFrames[cursor];

        cursor += 1;

        await loadFrame(
          frameIndex,
        );
      }
    };

    const workerCount =
      prefersReducedMotion
        ? 1
        : isMobile
          ? 4
          : 6;

    const workers = Array.from(
      {
        length: workerCount,
      },
      () => worker(),
    );

    void Promise.all(workers);

    return () => {
      cancelled = true;

      imagesRef.current.forEach(
        (image) => {
          if (image) {
            image.src = "";
          }
        },
      );

      imagesRef.current = [];
    };
  }, [
    isMobile,
    paintFrame,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    const frameCount = isMobile
      ? MOBILE_FRAME_COUNT
      : DESKTOP_FRAME_COUNT;

    const updateScene = () => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      if (prefersReducedMotion) {
        const finalFrame =
          frameCount - 1;

        currentFrameRef.current =
          finalFrame;

        setProgress(1);
        paintFrame(finalFrame);

        return;
      }

      const rect =
        section.getBoundingClientRect();

      const scrollDistance =
        Math.max(
          1,
          section.offsetHeight -
            window.innerHeight,
        );

      const nextProgress = clamp(
        -rect.top / scrollDistance,
      );

      const nextFrame = Math.round(
        nextProgress *
          (frameCount - 1),
      );

      currentFrameRef.current =
        nextFrame;

      paintFrame(nextFrame);

      if (
        Math.abs(
          nextProgress -
            previousProgressRef.current,
        ) >= 0.001
      ) {
        previousProgressRef.current =
          nextProgress;

        setProgress(nextProgress);
      }
    };

    const scheduleUpdate = () => {
      if (
        animationFrameRef.current !==
        null
      ) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          () => {
            animationFrameRef.current =
              null;

            updateScene();
          },
        );
    };

    updateScene();

    window.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      scheduleUpdate,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleUpdate,
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate,
      );

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );
      }
    };
  }, [
    isMobile,
    paintFrame,
    prefersReducedMotion,
  ]);

  const loadingPercentage =
    framesToLoad > 0
      ? Math.round(
          (loadedFrames /
            framesToLoad) *
            100,
        )
      : 0;

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="NewHub cinematic identity experience"
      className={`
        relative
        isolate
        overflow-clip
        bg-[#08010f]
        ${
          prefersReducedMotion
            ? "h-[125svh]"
            : "h-[520svh] md:h-[650svh] lg:h-[700svh]"
        }
      `}
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          w-full
          overflow-hidden
          bg-[#08010f]
        "
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          style={{
            filter:
              "brightness(1.02) contrast(1.04) saturate(1.04)",
          }}
        />

        {/* Cinematic edge vignette */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_22%,rgba(8,1,15,0.12)_52%,rgba(8,1,15,0.82)_100%)]
          "
        />

        {/* Top navigation scrim */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-52
            bg-gradient-to-b
            from-[#08010f]/95
            via-[#08010f]/35
            to-transparent
          "
        />

        {/* Bottom section transition */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-64
            bg-gradient-to-t
            from-[#08010f]
            via-[#08010f]/55
            to-transparent
          "
        />

        {!isReady && (
          <div
            className="
              absolute
              inset-0
              z-30
              flex
              items-center
              justify-center
              bg-[#08010f]
            "
          >
            <div className="px-6 text-center">
              <div
                className="
                  mx-auto
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-2
                  border-white/10
                  border-t-[#F0199A]
                "
              />

              <p
                className="
                  mt-5
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.24em]
                  text-white/45
                "
              >
                Preparing your NewHub
                experience
              </p>
            </div>
          </div>
        )}

        {isReady &&
          loadedFrames <
            framesToLoad && (
            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-24
                z-30
                w-[min(240px,60vw)]
                -translate-x-1/2
              "
            >
              <div
                className="
                  h-0.5
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#F0199A]
                    via-[#B838E8]
                    to-[#7132C8]
                    transition-[width]
                    duration-300
                  "
                  style={{
                    width: `${loadingPercentage}%`,
                  }}
                />
              </div>
            </div>
          )}

        {/* Editorial copy */}
        <div
          className="
            pointer-events-none
            relative
            z-20
            mx-auto
            h-full
            max-w-[1440px]
            px-5
            sm:px-8
            lg:px-14
          "
        >
          <div
            style={getBeatStyle(
              progress,
              0,
              0.2,
            )}
            className="
              absolute
              left-5
              top-[21%]
              max-w-lg
              transition-[opacity,transform]
              duration-150
              sm:left-8
              lg:left-14
            "
          >
            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.38em]
                text-white/60
                sm:text-sm
              "
            >
              They blend in.
            </p>
          </div>

          <div
            style={getBeatStyle(
              progress,
              0.14,
              0.38,
            )}
            className="
              absolute
              left-5
              top-[19%]
              max-w-3xl
              transition-[opacity,transform]
              duration-150
              sm:left-8
              lg:left-14
            "
          >
            <h1
              className="
                max-w-3xl
                bg-gradient-to-r
                from-[#F0199A]
                via-[#B838E8]
                to-[#7132C8]
                bg-clip-text
                text-5xl
                font-black
                leading-[0.9]
                tracking-[-0.065em]
                text-transparent
                sm:text-7xl
                lg:text-8xl
              "
            >
              One stands out.
            </h1>

            <p
              className="
                mt-5
                text-sm
                font-semibold
                tracking-wide
                text-white/60
                sm:text-base
              "
            >
              Personal. Professional.
              One profile.
            </p>
          </div>

          <div
            style={getBeatStyle(
              progress,
              0.33,
              0.56,
            )}
            className="
              absolute
              bottom-[17%]
              left-5
              max-w-sm
              transition-[opacity,transform]
              duration-150
              sm:left-8
              lg:left-14
            "
          >
            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.28em]
                text-[#F0199A]
              "
            >
              Personal
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                leading-tight
                tracking-[-0.045em]
                text-white
                sm:text-4xl
              "
            >
              Express every side of
              yourself.
            </h2>
          </div>

          <div
            style={getBeatStyle(
              progress,
              0.51,
              0.74,
            )}
            className="
              absolute
              right-5
              top-[20%]
              max-w-sm
              text-right
              transition-[opacity,transform]
              duration-150
              sm:right-8
              lg:right-14
            "
          >
            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.28em]
                text-[#B838E8]
              "
            >
              Professional
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                leading-tight
                tracking-[-0.045em]
                text-white
                sm:text-4xl
              "
            >
              Grow without hiding your
              personality.
            </h2>
          </div>

          <div
            style={getBeatStyle(
              progress,
              0.68,
              0.89,
            )}
            className="
              absolute
              bottom-[17%]
              right-5
              max-w-sm
              text-right
              transition-[opacity,transform]
              duration-150
              sm:right-8
              lg:right-14
            "
          >
            <p
              className="
                text-xs
                font-black
                uppercase
                tracking-[0.28em]
                text-[#5D8CFF]
              "
            >
              Community
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                leading-tight
                tracking-[-0.045em]
                text-white
                sm:text-4xl
              "
            >
              Find people who genuinely
              match you.
            </h2>
          </div>

          <div
            style={getBeatStyle(
              progress,
              0.84,
              1.01,
            )}
            className="
              pointer-events-auto
              absolute
              inset-x-5
              bottom-[9%]
              flex
              flex-col
              items-center
              text-center
              transition-[opacity,transform]
              duration-150
              sm:inset-x-8
            "
          >
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.3em]
                text-white/50
                sm:text-xs
              "
            >
              Three dimensions. One
              identity.
            </p>

            <h2
              className="
                mt-4
                max-w-4xl
                text-4xl
                font-black
                leading-[0.94]
                tracking-[-0.055em]
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              One profile.
              <br />
              Every side of you.
            </h2>

            <button
              type="button"
              onClick={onGetAccess}
              className="
                mt-7
                min-h-14
                rounded-full
                bg-gradient-to-r
                from-[#F0199A]
                via-[#B838E8]
                to-[#7132C8]
                px-8
                text-sm
                font-black
                text-white
                shadow-[0_18px_50px_rgba(184,56,232,0.32)]
                transition
                duration-300
                hover:-translate-y-1
                hover:scale-[1.02]
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-[#B838E8]/30
              "
            >
              Get Early Access
            </button>
          </div>
        </div>

        {!prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-5
              left-1/2
              z-20
              -translate-x-1/2
              text-center
            "
          >
            <p
              className="
                whitespace-nowrap
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-white/30
                sm:text-[9px]
              "
            >
              Scroll to control the
              experience
            </p>

            <div
              className="
                mx-auto
                mt-2
                h-9
                w-px
                overflow-hidden
                bg-white/10
              "
            >
              <div
                className="
                  h-full
                  w-full
                  origin-top
                  bg-gradient-to-b
                  from-[#F0199A]
                  to-[#7132C8]
                "
                style={{
                  transform: `scaleY(${Math.max(
                    progress,
                    0.025,
                  )})`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
