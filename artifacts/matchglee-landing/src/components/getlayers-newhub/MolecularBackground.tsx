import {
  useEffect,
  useRef,
} from "react";

interface MolecularBackgroundProps {
  variant?: "dark" | "light";
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  alpha: number;
}

function clamp(
  value: number,
  minimum: number,
  maximum: number,
) {
  return Math.min(
    maximum,
    Math.max(minimum, value),
  );
}

export default function MolecularBackground({
  variant = "dark",
  className = "",
}: MolecularBackgroundProps) {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(
      null,
    );

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const host =
      canvas?.parentElement;

    if (
      !canvas ||
      !host
    ) {
      return;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    let width = 1;
    let height = 1;
    let dpr = 1;

    let particles: Particle[] = [];
    let animationFrame = 0;
    let isVisible = true;

    const pointer = {
      x: -1000,
      y: -1000,
    };

    const createParticles =
      () => {
        const area =
          width * height;

        const mobile =
          width < 768;

        const count = clamp(
          Math.round(
            area /
              (mobile
                ? 23000
                : 19000),
          ),
          mobile ? 30 : 45,
          mobile ? 58 : 95,
        );

        particles =
          Array.from(
            {
              length: count,
            },
            () => ({
              x:
                Math.random() *
                width,
              y:
                Math.random() *
                height,
              velocityX:
                (Math.random() -
                  0.5) *
                0.18,
              velocityY:
                (Math.random() -
                  0.5) *
                0.18,
              radius:
                Math.random() *
                  1.7 +
                0.8,
              alpha:
                Math.random() *
                  0.4 +
                0.2,
            }),
          );
      };

    const resize =
      () => {
        const bounds =
          host.getBoundingClientRect();

        width = Math.max(
          1,
          bounds.width,
        );

        height = Math.max(
          1,
          bounds.height,
        );

        dpr = Math.min(
          window.devicePixelRatio ||
            1,
          1.5,
        );

        canvas.width =
          Math.round(
            width * dpr,
          );

        canvas.height =
          Math.round(
            height * dpr,
          );

        canvas.style.width =
          `${width}px`;

        canvas.style.height =
          `${height}px`;

        context.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0,
        );

        createParticles();
      };

    const updateParticles =
      () => {
        for (
          const particle of
          particles
        ) {
          const distanceX =
            pointer.x -
            particle.x;

          const distanceY =
            pointer.y -
            particle.y;

          const distance =
            Math.hypot(
              distanceX,
              distanceY,
            );

          if (
            distance > 0 &&
            distance < 170
          ) {
            const force =
              (170 - distance) /
              170;

            particle.x -=
              (distanceX /
                distance) *
              force *
              0.35;

            particle.y -=
              (distanceY /
                distance) *
              force *
              0.35;
          }

          particle.x +=
            particle.velocityX;

          particle.y +=
            particle.velocityY;

          if (
            particle.x < 0 ||
            particle.x > width
          ) {
            particle.velocityX *=
              -1;
          }

          if (
            particle.y < 0 ||
            particle.y > height
          ) {
            particle.velocityY *=
              -1;
          }

          particle.x = clamp(
            particle.x,
            0,
            width,
          );

          particle.y = clamp(
            particle.y,
            0,
            height,
          );
        }
      };

    const draw =
      () => {
        context.clearRect(
          0,
          0,
          width,
          height,
        );

        const connectionDistance =
          width < 768
            ? 125
            : 155;

        for (
          let firstIndex = 0;
          firstIndex <
          particles.length;
          firstIndex += 1
        ) {
          const first =
            particles[firstIndex];

          for (
            let secondIndex =
              firstIndex + 1;
            secondIndex <
            particles.length;
            secondIndex += 1
          ) {
            const second =
              particles[
                secondIndex
              ];

            const distance =
              Math.hypot(
                first.x -
                  second.x,
                first.y -
                  second.y,
              );

            if (
              distance >
              connectionDistance
            ) {
              continue;
            }

            const opacity =
              (1 -
                distance /
                  connectionDistance) *
              (variant === "dark"
                ? 0.18
                : 0.1);

            context.beginPath();

            context.moveTo(
              first.x,
              first.y,
            );

            context.lineTo(
              second.x,
              second.y,
            );

            context.strokeStyle =
              variant === "dark"
                ? `rgba(190, 70, 205, ${opacity})`
                : `rgba(113, 50, 200, ${opacity})`;

            context.lineWidth =
              0.7;

            context.stroke();
          }
        }

        for (
          const particle of
          particles
        ) {
          context.beginPath();

          context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2,
          );

          context.fillStyle =
            variant === "dark"
              ? `rgba(240, 25, 154, ${particle.alpha})`
              : `rgba(177, 48, 180, ${particle.alpha * 0.7})`;

          context.fill();
        }
      };

    const animate =
      () => {
        if (!isVisible) {
          return;
        }

        if (!reducedMotion) {
          updateParticles();
        }

        draw();

        if (!reducedMotion) {
          animationFrame =
            window.requestAnimationFrame(
              animate,
            );
        }
      };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const bounds =
        host.getBoundingClientRect();

      pointer.x =
        event.clientX -
        bounds.left;

      pointer.y =
        event.clientY -
        bounds.top;
    };

    const handlePointerLeave =
      () => {
        pointer.x = -1000;
        pointer.y = -1000;
      };

    const resizeObserver =
      new ResizeObserver(
        () => {
          resize();
          draw();
        },
      );

    const visibilityObserver =
      new IntersectionObserver(
        ([entry]) => {
          isVisible =
            entry.isIntersecting;

          window.cancelAnimationFrame(
            animationFrame,
          );

          if (isVisible) {
            animate();
          }
        },
        {
          rootMargin:
            "180px 0px",
        },
      );

    resizeObserver.observe(
      host,
    );

    visibilityObserver.observe(
      host,
    );

    host.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    host.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    resize();
    animate();

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      host.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      host.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={[
        "nh-molecular-background",
        `nh-molecular-background--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
