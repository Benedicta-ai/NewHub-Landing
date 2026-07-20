import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";

import "./ImageTrail.css";

export interface ImageTrailItem {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface ImageTrailProps {
  items: ImageTrailItem[];
  threshold?: number;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

const lerp = (a: number, b: number, amount: number) =>
  (1 - amount) * a + amount * b;

const getDistance = (first: Point, second: Point) =>
  Math.hypot(first.x - second.x, first.y - second.y);

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export default function ImageTrail({
  items,
  threshold = 80,
  className = "",
}: ImageTrailProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const host = layer?.parentElement;

    if (!layer || !host || items.length === 0) return;

    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!supportsFinePointer.matches || prefersReducedMotion.matches) return;

    const imageElements = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-image-trail-item]"),
    );

    if (imageElements.length === 0) return;

    gsap.set(imageElements, {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
    });

    let hostRect = host.getBoundingClientRect();
    let pointerPosition: Point = { x: 0, y: 0 };
    let previousPointerPosition: Point = { x: 0, y: 0 };
    let cachedPointerPosition: Point = { x: 0, y: 0 };
    let imagePosition = -1;
    let zIndex = 1;
    let hasPointerPosition = false;
    let animationFrame = 0;

    const refreshRect = () => {
      hostRect = host.getBoundingClientRect();
    };

    const setInitialPointerPosition = (nextPosition: Point) => {
      pointerPosition = nextPosition;
      previousPointerPosition = nextPosition;
      cachedPointerPosition = nextPosition;
      hasPointerPosition = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      refreshRect();

      const nextPosition = {
        x: event.clientX - hostRect.left,
        y: event.clientY - hostRect.top,
      };

      if (!hasPointerPosition) {
        setInitialPointerPosition(nextPosition);
        return;
      }

      pointerPosition = nextPosition;
    };

    const handlePointerLeave = () => {
      hasPointerPosition = false;
    };

    const showNextImage = () => {
      imagePosition = (imagePosition + 1) % imageElements.length;
      zIndex += 1;

      const imageElement = imageElements[imagePosition];
      const imageWidth = imageElement.offsetWidth;
      const imageHeight = imageElement.offsetHeight;
      const horizontalPadding = 18;
      const verticalPadding = 18;

      const maximumX = Math.max(
        horizontalPadding,
        hostRect.width - imageWidth - horizontalPadding,
      );
      const maximumY = Math.max(
        verticalPadding,
        hostRect.height - imageHeight - verticalPadding,
      );

      const startX = clamp(
        cachedPointerPosition.x - imageWidth / 2,
        horizontalPadding,
        maximumX,
      );
      const startY = clamp(
        cachedPointerPosition.y - imageHeight / 2,
        verticalPadding,
        maximumY,
      );
      const endX = clamp(
        pointerPosition.x - imageWidth / 2,
        horizontalPadding,
        maximumX,
      );
      const endY = clamp(
        pointerPosition.y - imageHeight / 2,
        verticalPadding,
        maximumY,
      );

      gsap.killTweensOf(imageElement);

      gsap
        .timeline()
        .fromTo(
          imageElement,
          {
            opacity: 1,
            scale: 0.94,
            rotation: gsap.utils.random(-2.2, 2.2),
            zIndex,
            x: startX,
            y: startY,
          },
          {
            duration: 0.42,
            ease: "power1.out",
            opacity: 1,
            scale: 1,
            x: endX,
            y: endY,
          },
          0,
        )
        .to(
          imageElement,
          {
            duration: 0.46,
            ease: "power3.in",
            opacity: 0,
            scale: 0.25,
          },
          0.42,
        );
    };

    const render = () => {
      if (hasPointerPosition) {
        cachedPointerPosition.x = lerp(
          cachedPointerPosition.x,
          pointerPosition.x,
          0.1,
        );
        cachedPointerPosition.y = lerp(
          cachedPointerPosition.y,
          pointerPosition.y,
          0.1,
        );

        if (
          getDistance(pointerPosition, previousPointerPosition) > threshold
        ) {
          showNextImage();
          previousPointerPosition = { ...pointerPosition };
        }
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", refreshRect);
    window.addEventListener("scroll", refreshRect, { passive: true });

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", refreshRect);
      window.removeEventListener("scroll", refreshRect);
      window.cancelAnimationFrame(animationFrame);
      gsap.killTweensOf(imageElements);
    };
  }, [items, threshold]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className={`newhub-image-trail ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={`${item.src}-${index}`}
          data-image-trail-item
          className="newhub-image-trail__item"
          style={
            {
              "--trail-aspect-ratio": `${item.width} / ${item.height}`,
            } as CSSProperties
          }
        >
          <img
            src={item.src}
            alt=""
            draggable={false}
            loading="eager"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
