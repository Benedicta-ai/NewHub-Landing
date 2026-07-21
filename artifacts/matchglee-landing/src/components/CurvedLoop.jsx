import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import "./CurvedLoop.css";

export default function CurvedLoop({
  marqueeText = "",
  speed = 0.5,
  className = "",
  curveAmount = 118,
  direction = "right",
  interactive = false,
  respectReducedMotion = true,
}) {
  const measureRef = useRef(null);
  const textPathRef = useRef(null);

  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const directionRef = useRef(direction);
  const velocityRef = useRef(0);

  const [spacing, setSpacing] = useState(0);
  const [reduceMotion, setReduceMotion] =
    useState(false);

  const uniqueId = useId().replace(/:/g, "");
  const pathId = `newhub-curve-${uniqueId}`;

  const normalizedText = useMemo(() => {
    const trimmedText = marqueeText.trimEnd();

    return `${trimmedText}\u00A0`;
  }, [marqueeText]);

  /*
    One clean, open and non-intersecting curve.

    It begins outside the left edge, dips smoothly
    through the centre and exits beyond the right edge.
  */
  const pathDefinition = `
    M -140 28
    C 220 34,
      340 ${curveAmount + 42},
      720 ${curveAmount + 50}
    C 1080 ${curveAmount + 56},
      1260 72,
      1580 34
  `;

  const repeatedText = useMemo(() => {
    if (!spacing) {
      return normalizedText;
    }

    const repetitionCount =
      Math.ceil(9000 / spacing) + 14;

    return normalizedText.repeat(
      repetitionCount,
    );
  }, [normalizedText, spacing]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const syncPreference = () => {
      setReduceMotion(
        respectReducedMotion &&
          mediaQuery.matches,
      );
    };

    syncPreference();

    mediaQuery.addEventListener(
      "change",
      syncPreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        syncPreference,
      );
    };
  }, [respectReducedMotion]);

  useEffect(() => {
    let cancelled = false;

    const measureText = () => {
      if (
        cancelled ||
        !measureRef.current
      ) {
        return;
      }

      const measuredLength =
        measureRef.current.getComputedTextLength();

      if (measuredLength > 0) {
        setSpacing(measuredLength);
      }
    };

    const frame =
      window.requestAnimationFrame(
        measureText,
      );

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measureText();
      });
    }

    return () => {
      cancelled = true;

      window.cancelAnimationFrame(frame);
    };
  }, [normalizedText, className]);

  useEffect(() => {
    if (
      !spacing ||
      !textPathRef.current
    ) {
      return;
    }

    textPathRef.current.setAttribute(
      "startOffset",
      `${-spacing * 0.45}px`,
    );
  }, [spacing]);

  useEffect(() => {
    if (
      !spacing ||
      !textPathRef.current ||
      reduceMotion
    ) {
      return undefined;
    }

    let animationFrame = 0;

    const animate = () => {
      const textPath =
        textPathRef.current;

      if (
        textPath &&
        !draggingRef.current
      ) {
        const currentOffset =
          Number.parseFloat(
            textPath.getAttribute(
              "startOffset",
            ) ?? "0",
          );

        const movement =
          directionRef.current === "right"
            ? speed
            : -speed;

        let nextOffset =
          currentOffset + movement;

        if (nextOffset <= -spacing) {
          nextOffset += spacing;
        }

        if (nextOffset > 0) {
          nextOffset -= spacing;
        }

        textPath.setAttribute(
          "startOffset",
          `${nextOffset}px`,
        );
      }

      animationFrame =
        window.requestAnimationFrame(
          animate,
        );
    };

    animationFrame =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, [
    spacing,
    speed,
    reduceMotion,
  ]);

  const handlePointerDown = (event) => {
    if (!interactive) {
      return;
    }

    draggingRef.current = true;
    lastXRef.current = event.clientX;
    velocityRef.current = 0;

    try {
      event.currentTarget.setPointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture may be unavailable.
    }
  };

  const handlePointerMove = (event) => {
    if (
      !interactive ||
      !draggingRef.current ||
      !textPathRef.current ||
      !spacing
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      lastXRef.current;

    lastXRef.current = event.clientX;
    velocityRef.current = deltaX;

    const currentOffset =
      Number.parseFloat(
        textPathRef.current.getAttribute(
          "startOffset",
        ) ?? "0",
      );

    let nextOffset =
      currentOffset + deltaX;

    if (nextOffset <= -spacing) {
      nextOffset += spacing;
    }

    if (nextOffset > 0) {
      nextOffset -= spacing;
    }

    textPathRef.current.setAttribute(
      "startOffset",
      `${nextOffset}px`,
    );
  };

  const finishDrag = () => {
    if (!interactive) {
      return;
    }

    draggingRef.current = false;

    if (velocityRef.current !== 0) {
      directionRef.current =
        velocityRef.current > 0
          ? "right"
          : "left";
    }
  };

  const ready = spacing > 0;
  const initialOffset =
    -spacing * 0.45;

  return (
    <div
      className={`
        curved-loop-jacket
        ${
          interactive
            ? "curved-loop-interactive"
            : ""
        }
      `}
      style={{
        visibility: ready
          ? "visible"
          : "hidden",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerLeave={finishDrag}
    >
      <svg
        className="curved-loop-svg"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={className}
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {normalizedText}
        </text>

        <defs>
          <path
            id={pathId}
            d={pathDefinition}
            fill="none"
          />
        </defs>

        {ready && (
          <text
            xmlSpace="preserve"
            className={className}
          >
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${initialOffset}px`}
              xmlSpace="preserve"
            >
              {repeatedText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
