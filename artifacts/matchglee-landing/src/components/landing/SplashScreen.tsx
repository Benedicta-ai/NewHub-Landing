import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./SplashScreen.css";

interface SplashScreenProps {
  onFinish: () => void;
}

interface SplashParticle {
  startX: number;
  startY: number;

  targetX: number;
  targetY: number;

  burstX: number;
  burstY: number;

  size: number;
  delay: number;
  color: string;
  drift: number;
}

const FORMATION_DURATION = 1350;
const HOLD_END = 2150;
const BURST_END = 3300;

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

const lerp = (
  start: number,
  end: number,
  progress: number,
) => {
  return (
    start +
    (end - start) * progress
  );
};

const easeOutCubic = (
  progress: number,
) => {
  return 1 - Math.pow(1 - progress, 3);
};

const easeInOutCubic = (
  progress: number,
) => {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 -
        Math.pow(
          -2 * progress + 2,
          3,
        ) /
          2;
};

const getParticleColor = (
  index: number,
) => {
  const colorIndex = index % 7;

  if (
    colorIndex === 0 ||
    colorIndex === 3
  ) {
    return "240, 25, 154";
  }

  if (
    colorIndex === 1 ||
    colorIndex === 4
  ) {
    return "184, 56, 232";
  }

  if (
    colorIndex === 2 ||
    colorIndex === 5
  ) {
    return "113, 50, 200";
  }

  return "82, 123, 255";
};

const createParticles = (
  width: number,
  height: number,
): SplashParticle[] => {
  const isMobile = width < 768;

  const particleCount = isMobile
    ? 430
    : 760;

  const centreX = width / 2;
  const centreY = height / 2 - 14;

  const horizontalRadius = Math.min(
    width * 0.22,
    isMobile ? 125 : 205,
  );

  const verticalRadius =
    horizontalRadius *
    (isMobile ? 0.42 : 0.38);

  return Array.from(
    {
      length: particleCount,
    },
    (_, index) => {
      const angle =
        (index / particleCount) *
        Math.PI *
        2;

      /*
        Parametric infinity/knot shape.

        x = sin(t)
        y = sin(2t)
      */
      const knotX =
        Math.sin(angle) *
        horizontalRadius;

      const knotY =
        Math.sin(angle * 2) *
        verticalRadius;

      const jitterX =
        (Math.random() - 0.5) *
        (isMobile ? 5 : 8);

      const jitterY =
        (Math.random() - 0.5) *
        (isMobile ? 5 : 8);

      const targetX =
        centreX + knotX + jitterX;

      const targetY =
        centreY + knotY + jitterY;

      const entersFromLeft =
        index % 2 === 0;

      const startX = entersFromLeft
        ? -80 -
          Math.random() *
            width *
            0.18
        : width +
          80 +
          Math.random() *
            width *
            0.18;

      const startY =
        centreY +
        (Math.random() - 0.5) *
          height *
          0.7;

      const distanceFromCentre =
        Math.max(
          1,
          Math.hypot(
            targetX - centreX,
            targetY - centreY,
          ),
        );

      const directionX =
        (targetX - centreX) /
        distanceFromCentre;

      const directionY =
        (targetY - centreY) /
        distanceFromCentre;

      const burstDistance =
        240 + Math.random() * 500;

      return {
        startX,
        startY,

        targetX,
        targetY,

        burstX:
          targetX +
          directionX *
            burstDistance +
          (Math.random() - 0.5) *
            260,

        burstY:
          targetY +
          directionY *
            burstDistance +
          (Math.random() - 0.5) *
            260,

        size:
          (isMobile ? 0.8 : 1) +
          Math.random() *
            (isMobile ? 1.6 : 2.1),

        delay:
          Math.random() *
          (isMobile ? 220 : 360),

        color:
          getParticleColor(index),

        drift:
          Math.random() *
          Math.PI *
          2,
      };
    },
  );
};

export default function SplashScreen({
  onFinish,
}: SplashScreenProps) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null,
    );

  const onFinishRef =
    useRef(onFinish);

  const [isLeaving, setIsLeaving] =
    useState(false);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const holdDuration = reducedMotion
      ? 650
      : 2500;

    const fadeDuration = reducedMotion
      ? 250
      : 850;

    const leaveTimer =
      window.setTimeout(() => {
        setIsLeaving(true);
      }, holdDuration);

    const finishTimer =
      window.setTimeout(() => {
        onFinishRef.current();
      }, holdDuration + fadeDuration);

    return () => {
      window.clearTimeout(
        leaveTimer,
      );

      window.clearTimeout(
        finishTimer,
      );
    };
  }, []);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let particles: SplashParticle[] =
      [];

    let animationFrame = 0;

    let startTime =
      performance.now();

    let devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2,
    );

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
      );

      canvas.width =
        width * devicePixelRatio;

      canvas.height =
        height * devicePixelRatio;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      particles = createParticles(
        width,
        height,
      );

      startTime =
        performance.now();
    };

    const drawKnotPath = (
      elapsed: number,
    ) => {
      const centreX = width / 2;
      const centreY =
        height / 2 - 14;

      const isMobile = width < 768;

      const horizontalRadius =
        Math.min(
          width * 0.22,
          isMobile ? 125 : 205,
        );

      const verticalRadius =
        horizontalRadius *
        (isMobile ? 0.42 : 0.38);

      const formationProgress =
        clamp(
          elapsed /
            FORMATION_DURATION,
        );

      const burstProgress =
        clamp(
          (elapsed - HOLD_END) /
            (BURST_END - HOLD_END),
        );

      const pathOpacity =
        easeOutCubic(
          formationProgress,
        ) *
        (1 - burstProgress);

      if (pathOpacity <= 0) {
        return;
      }

      const gradient =
        context.createLinearGradient(
          centreX -
            horizontalRadius,
          centreY,
          centreX +
            horizontalRadius,
          centreY,
        );

      gradient.addColorStop(
        0,
        `rgba(240, 25, 154, ${
          pathOpacity * 0.34
        })`,
      );

      gradient.addColorStop(
        0.5,
        `rgba(184, 56, 232, ${
          pathOpacity * 0.42
        })`,
      );

      gradient.addColorStop(
        1,
        `rgba(113, 50, 200, ${
          pathOpacity * 0.34
        })`,
      );

      context.beginPath();

      const totalSegments = 180;

      for (
        let segment = 0;
        segment <= totalSegments;
        segment += 1
      ) {
        const angle =
          (segment /
            totalSegments) *
          Math.PI *
          2;

        const x =
          centreX +
          Math.sin(angle) *
            horizontalRadius;

        const y =
          centreY +
          Math.sin(angle * 2) *
            verticalRadius;

        if (segment === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.strokeStyle =
        gradient;

      context.lineWidth =
        isMobile ? 1 : 1.35;

      context.stroke();
    };

    const drawStaticFrame = () => {
      context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
      );

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0,
      );

      drawKnotPath(
        FORMATION_DURATION,
      );

      context.globalCompositeOperation =
        "lighter";

      particles.forEach(
        (particle) => {
          context.beginPath();

          context.arc(
            particle.targetX,
            particle.targetY,
            particle.size,
            0,
            Math.PI * 2,
          );

          context.fillStyle =
            `rgba(${particle.color}, 0.78)`;

          context.fill();
        },
      );

      context.globalCompositeOperation =
        "source-over";
    };

    const render = (
      currentTime: number,
    ) => {
      const elapsed =
        currentTime - startTime;

      context.setTransform(
        1,
        0,
        0,
        1,
        0,
        0,
      );

      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0,
      );

      drawKnotPath(elapsed);

      context.globalCompositeOperation =
        "lighter";

      particles.forEach(
        (particle) => {
          const particleElapsed =
            elapsed - particle.delay;

          if (particleElapsed < 0) {
            return;
          }

          let x = particle.targetX;
          let y = particle.targetY;
          let opacity = 1;
          let scale = 1;

          if (
            particleElapsed <
            FORMATION_DURATION
          ) {
            const progress =
              easeOutCubic(
                clamp(
                  particleElapsed /
                    FORMATION_DURATION,
                ),
              );

            x = lerp(
              particle.startX,
              particle.targetX,
              progress,
            );

            y = lerp(
              particle.startY,
              particle.targetY,
              progress,
            );

            opacity = clamp(
              progress * 1.7,
            );

            scale =
              0.35 +
              progress * 0.65;
          } else if (
            particleElapsed <
            HOLD_END
          ) {
            const holdProgress =
              (particleElapsed -
                FORMATION_DURATION) /
              (HOLD_END -
                FORMATION_DURATION);

            const pulse =
              Math.sin(
                holdProgress *
                  Math.PI *
                  2 +
                  particle.drift,
              );

            x =
              particle.targetX +
              pulse * 1.8;

            y =
              particle.targetY +
              Math.cos(
                holdProgress *
                  Math.PI *
                  2 +
                  particle.drift,
              ) *
                1.8;

            opacity =
              0.75 +
              Math.abs(pulse) *
                0.2;
          } else {
            const progress =
              easeInOutCubic(
                clamp(
                  (particleElapsed -
                    HOLD_END) /
                    (BURST_END -
                      HOLD_END),
                ),
              );

            x = lerp(
              particle.targetX,
              particle.burstX,
              progress,
            );

            y = lerp(
              particle.targetY,
              particle.burstY,
              progress,
            );

            opacity =
              1 - progress;

            scale =
              1 +
              progress * 0.8;
          }

          if (opacity <= 0) {
            return;
          }

          context.beginPath();

          context.arc(
            x,
            y,
            particle.size * scale,
            0,
            Math.PI * 2,
          );

          context.fillStyle =
            `rgba(${particle.color}, ${opacity})`;

          context.fill();
        },
      );

      context.globalCompositeOperation =
        "source-over";

      if (elapsed < BURST_END) {
        animationFrame =
          window.requestAnimationFrame(
            render,
          );
      }
    };

    resizeCanvas();

    if (reducedMotion) {
      drawStaticFrame();
    } else {
      animationFrame =
        window.requestAnimationFrame(
          render,
        );
    }

    window.addEventListener(
      "resize",
      resizeCanvas,
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas,
      );

      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, []);

  return (
    <div
      role="status"
      aria-label="Loading NewHub"
      className={`
        newhub-splash-screen
        ${
          isLeaving
            ? "newhub-splash-screen-leaving"
            : ""
        }
      `}
    >
      <div
        aria-hidden="true"
        className="newhub-splash-background"
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="newhub-splash-canvas"
      />

      <div
        aria-hidden="true"
        className="newhub-splash-centre-glow"
      />

      <div className="newhub-splash-content">
        <h1 className="newhub-splash-title">
          NewHub
        </h1>

        <p className="newhub-splash-tagline">
          Personal · Professional · One
          profile
        </p>

        <div
          className="newhub-splash-progress-track"
          role="progressbar"
          aria-label="Loading NewHub"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="newhub-splash-progress-fill" />
        </div>
      </div>
    </div>
  );
}
