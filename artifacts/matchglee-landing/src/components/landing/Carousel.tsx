import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";

export interface CarouselItem {
  icon?: string;
  title: string;
  desc: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
  ariaLabel?: string;
}

export default function Carousel({
  items,
  ariaLabel = "NewHub features",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );

  const total = items.length;

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();

    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (index >= total && total > 0) {
      setIndex(0);
    }
  }, [index, total]);

  if (total === 0) {
    return null;
  }

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const centerWidth = isMobile
    ? Math.min(viewportWidth - 40, 350)
    : isTablet
      ? 480
      : 560;

  const centerHeight = isMobile ? 360 : isTablet ? 375 : 390;

  const sideWidth = isMobile ? 168 : isTablet ? 205 : 225;
  const sideHeight = isMobile ? 265 : isTablet ? 310 : 330;

  const stageHeight = isMobile ? 430 : isTablet ? 460 : 475;
  const maxVisibleOffset = isMobile ? 1 : isTablet ? 2 : 3;

  const getOffset = (slideIndex: number) => {
    let difference = slideIndex - index;

    if (difference > total / 2) {
      difference -= total;
    }

    if (difference < -total / 2) {
      difference += total;
    }

    return difference;
  };

  const getPosition = (offset: number) => {
    const absoluteOffset = Math.abs(offset);
    const direction = offset < 0 ? -1 : 1;

    if (isMobile) {
      return direction * 230;
    }

    if (isTablet) {
      const positions = [0, 290, 455];

      return direction * (positions[absoluteOffset] ?? 455);
    }

    const positions = [0, 355, 565, 735];

    return direction * (positions[absoluteOffset] ?? 735);
  };

  const go = (direction: 1 | -1) => {
    setIndex((currentIndex) => {
      return (currentIndex + direction + total) % total;
    });
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x;

    // Swipe left
    if (distance < -55 || velocity < -450) {
      go(1);
      return;
    }

    // Swipe right
    if (distance > 55 || velocity > 450) {
      go(-1);
    }
  };

  return (
    <div
      className="
        relative
        outline-none
        overscroll-x-contain
      "
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          go(-1);
        }

        if (event.key === "ArrowRight") {
          go(1);
        }
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          height: stageHeight,
          perspective: "2200px",
        }}
      >
        {/*
          Touch and mouse drag layer.

          touchAction: "pan-y" keeps normal vertical page scrolling
          available while allowing horizontal carousel swipes.
        */}
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          className="
            absolute
            inset-0
            z-10
            cursor-grab
            select-none
            active:cursor-grabbing
          "
          style={{
            touchAction: "pan-y",
          }}
        >
          {items.map((item, slideIndex) => {
            const offset = getOffset(slideIndex);
            const absoluteOffset = Math.abs(offset);
            const isCenter = offset === 0;

            if (absoluteOffset > maxVisibleOffset) {
              return null;
            }

            const cardWidth = isCenter ? centerWidth : sideWidth;
            const cardHeight = isCenter ? centerHeight : sideHeight;

            const opacity = isCenter
              ? 1
              : absoluteOffset === 1
                ? 0.92
                : absoluteOffset === 2
                  ? 0.64
                  : 0.36;

            const scale = isCenter
              ? 1
              : absoluteOffset === 1
                ? 0.96
                : absoluteOffset === 2
                  ? 0.9
                  : 0.84;

            return (
              <motion.article
                key={`${item.title}-${slideIndex}`}
                onClick={() => {
                  if (!isCenter) {
                    setIndex(slideIndex);
                  }
                }}
                animate={{
                  x: getPosition(offset),
                  y: 0,
                  opacity,
                  scale,
                  rotateY: isCenter ? 0 : offset > 0 ? -7 : 7,
                  filter: absoluteOffset >= 3 ? "blur(0.6px)" : "blur(0px)",
                }}
                whileHover={
                  isCenter
                    ? {
                        y: -7,
                      }
                    : {
                        scale: scale + 0.025,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 21,
                  mass: 0.9,
                }}
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  overflow-hidden
                  rounded-[26px]
                  border
                  bg-[#07060c]
                  shadow-[0_30px_90px_rgba(0,0,0,0.55)]
                  ${
                    isCenter
                      ? "border-white/20"
                      : "cursor-pointer border-white/10"
                  }
                `}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardHeight / 2,
                  zIndex: 40 - absoluteOffset,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Unique card image */}
                <img
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                    select-none
                    object-cover
                  "
                />

                {isCenter ? (
                  <>
                    {/* Readability overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(4,5,10,0.97) 0%, rgba(5,6,12,0.9) 34%, rgba(5,6,12,0.5) 60%, rgba(5,6,12,0.08) 100%)",
                      }}
                    />

                    {/* Bottom cinematic overlay */}
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-40
                        bg-gradient-to-t
                        from-black/75
                        to-transparent
                      "
                    />

                    {/* Border highlight */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[26px]
                      "
                      style={{
                        boxShadow:
                          "inset 0 0 0 1px rgba(201,81,255,0.4), 0 0 34px rgba(113,50,200,0.08)",
                      }}
                    />

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        justify-between
                        p-6
                        sm:p-7
                        md:p-8
                      "
                    >
                      <div className="flex justify-end">
                        {item.icon ? (
                          <span
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-white/10
                              bg-black/25
                              text-lg
                              text-white
                              backdrop-blur-md
                            "
                          >
                            {item.icon}
                          </span>
                        ) : null}
                      </div>

                      <div
                        className="
                          max-w-[80%]
                          sm:max-w-[64%]
                          md:max-w-[58%]
                        "
                      >
                        <h3
                          className="
                            mb-4
                            text-[28px]
                            font-semibold
                            leading-[1.08]
                            tracking-[-0.035em]
                            text-white
                            sm:text-[32px]
                            md:text-[36px]
                          "
                        >
                          {item.title}
                        </h3>

                        <div
                          className={`
                            mb-4
                            h-[3px]
                            w-10
                            rounded-full
                            ${BRAND_GRADIENT}
                          `}
                        />

                        <p
                          className="
                            text-[14px]
                            leading-6
                            text-white/72
                            sm:text-[15px]
                            sm:leading-7
                          "
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/95
                        via-black/25
                        to-black/5
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[26px]
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        z-10
                        p-4
                      "
                    >
                      <h3
                        className="
                          text-[15px]
                          font-semibold
                          leading-tight
                          text-white/95
                        "
                      >
                        {item.title}
                      </h3>

                      <div
                        className={`
                          mt-3
                          h-[2px]
                          w-6
                          rounded-full
                          ${BRAND_GRADIENT}
                        `}
                      />
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </motion.div>

        {/* Previous button */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous feature"
          className="
            absolute
            left-1
            z-[60]
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/45
            text-white/75
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
            sm:left-3
            lg:left-5
          "
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next feature"
          className="
            absolute
            right-1
            z-[60]
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/45
            text-white/75
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white/20
            hover:bg-white/10
            hover:text-white
            sm:right-3
            lg:right-5
          "
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Mobile swipe hint */}
      <p
        className="
          mt-1
          text-center
          text-[10px]
          uppercase
          tracking-[0.22em]
          text-white/30
          sm:hidden
        "
      >
        Swipe to explore
      </p>

      {/* Indicators */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {items.map((item, slideIndex) => (
          <button
            key={`${item.title}-indicator`}
            type="button"
            onClick={() => setIndex(slideIndex)}
            aria-label={`Show ${item.title}`}
            aria-current={slideIndex === index ? "true" : undefined}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                slideIndex === index
                  ? `h-2 w-8 ${BRAND_GRADIENT}`
                  : "h-2 w-2 bg-white/20 hover:bg-white/40"
              }
            `}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {items[index]?.title}
      </p>
    </div>
  );
}
