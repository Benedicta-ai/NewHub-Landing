import {
  useEffect,
  useRef,
  useState,
} from "react";

import SplashCursor from "@/components/SplashCursor";

export default function HeroSplashCursor() {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [supportsEffect, setSupportsEffect] =
    useState(false);

  const [isHeroVisible, setIsHeroVisible] =
    useState(true);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateSupport = () => {
      const hasTouch =
        navigator.maxTouchPoints > 0;

      setSupportsEffect(
        finePointer.matches &&
          !reducedMotion.matches &&
          !hasTouch &&
          window.innerWidth >= 768 &&
          document.visibilityState === "visible",
      );
    };

    updateSupport();

    finePointer.addEventListener(
      "change",
      updateSupport,
    );

    reducedMotion.addEventListener(
      "change",
      updateSupport,
    );

    window.addEventListener(
      "resize",
      updateSupport,
    );

    document.addEventListener(
      "visibilitychange",
      updateSupport,
    );

    return () => {
      finePointer.removeEventListener(
        "change",
        updateSupport,
      );

      reducedMotion.removeEventListener(
        "change",
        updateSupport,
      );

      window.removeEventListener(
        "resize",
        updateSupport,
      );

      document.removeEventListener(
        "visibilitychange",
        updateSupport,
      );
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(
          entry.isIntersecting &&
            entry.intersectionRatio >= 0.65,
        );
      },
      {
        threshold: [0, 0.25, 0.65, 1],
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const shouldRender =
    supportsEffect && isHeroVisible;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-[3]
        overflow-hidden
        opacity-[0.52]
        mix-blend-multiply
        dark:opacity-[0.66]
        dark:mix-blend-screen

        [&>div]:!pointer-events-none
        [&>div]:!absolute
        [&>div]:!inset-0
        [&>div]:!z-0
        [&>div]:!h-full
        [&>div]:!w-full

        [&_canvas]:!block
        [&_canvas]:!h-full
        [&_canvas]:!w-full
      "
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 68%, rgba(0,0,0,0.72) 82%, transparent 100%)",

        maskImage:
          "linear-gradient(to bottom, black 0%, black 68%, rgba(0,0,0,0.72) 82%, transparent 100%)",
      }}
    >
      {shouldRender && (
        <SplashCursor
          SIM_RESOLUTION={96}
          DYE_RESOLUTION={512}
          CAPTURE_RESOLUTION={256}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          PRESSURE_ITERATIONS={16}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          TRANSPARENT
          RAINBOW_MODE={false}
          COLOR="#A855F7"
          BACK_COLOR={{
            r: 0,
            g: 0,
            b: 0,
          }}
        />
      )}
    </div>
  );
}
