import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const distanceBetween = (pointA, pointB) => {
  const deltaX = pointB.x - pointA.x;
  const deltaY = pointB.y - pointA.y;

  return Math.sqrt(
    deltaX * deltaX + deltaY * deltaY,
  );
};

const getAttributeValue = (
  distance,
  maximumDistance,
  minimumValue,
  maximumValue,
) => {
  const safeMaximumDistance =
    Math.max(maximumDistance, 1);

  const value =
    maximumValue -
    Math.abs(
      (maximumValue * distance) /
        safeMaximumDistance,
    );

  return Math.max(
    minimumValue,
    value + minimumValue,
  );
};

const debounce = (callback, delay) => {
  let timeoutId;

  const debounced = (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debounced.cancel = () => {
    window.clearTimeout(timeoutId);
  };

  return debounced;
};

export default function TextPressure({
  text = "Compressa",
  fontFamily = "Roboto Flex",
  fontUrl =
    "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  stroke = false,
  scale = true,
  textColor = "#C72DCA",
  strokeColor = "#7132C8",
  className = "",
  minFontSize = 30,
  maxFontSize = 96,
  respectReducedMotion = true,
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const characterRefs = useRef([]);

  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorRef = useRef({
    x: 0,
    y: 0,
  });

  const [fontSize, setFontSize] =
    useState(minFontSize);

  const [scaleY, setScaleY] =
    useState(1);

  const [lineHeight, setLineHeight] =
    useState(1);

  const [reduceMotion, setReduceMotion] =
    useState(false);

  const characters = useMemo(
    () => text.split(""),
    [text],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updatePreference = () => {
      setReduceMotion(
        respectReducedMotion &&
          mediaQuery.matches,
      );
    };

    updatePreference();

    mediaQuery.addEventListener(
      "change",
      updatePreference,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updatePreference,
      );
    };
  }, [respectReducedMotion]);

  useEffect(() => {
    const updateCursor = (x, y) => {
      cursorRef.current.x = x;
      cursorRef.current.y = y;
    };

    const handleMouseMove = (event) => {
      updateCursor(
        event.clientX,
        event.clientY,
      );
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      updateCursor(
        touch.clientX,
        touch.clientY,
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      },
    );

    const container = containerRef.current;

    if (container) {
      const rect =
        container.getBoundingClientRect();

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      mouseRef.current = {
        x: centerX,
        y: centerY,
      };

      cursorRef.current = {
        x: centerX,
        y: centerY,
      };
    }

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove,
      );
    };
  }, []);

  const setSize = useCallback(() => {
    const container = containerRef.current;
    const title = titleRef.current;

    if (!container || !title) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    const characterCount =
      Math.max(characters.length, 1);

    let nextFontSize =
      containerRect.width /
      (characterCount / 2);

    nextFontSize = Math.min(
      Math.max(
        nextFontSize,
        minFontSize,
      ),
      maxFontSize,
    );

    setFontSize(nextFontSize);
    setScaleY(1);
    setLineHeight(1);

    window.requestAnimationFrame(() => {
      if (!titleRef.current) {
        return;
      }

      const textRect =
        titleRef.current.getBoundingClientRect();

      if (
        scale &&
        textRect.height > 0 &&
        containerRect.height > 0
      ) {
        const verticalScale =
          containerRect.height /
          textRect.height;

        setScaleY(verticalScale);
        setLineHeight(verticalScale);
      }
    });
  }, [
    characters.length,
    minFontSize,
    maxFontSize,
    scale,
  ]);

  useEffect(() => {
    const debouncedSetSize =
      debounce(setSize, 100);

    debouncedSetSize();

    window.addEventListener(
      "resize",
      debouncedSetSize,
    );

    return () => {
      debouncedSetSize.cancel();

      window.removeEventListener(
        "resize",
        debouncedSetSize,
      );
    };
  }, [setSize]);

  useEffect(() => {
    if (reduceMotion) {
      characterRefs.current.forEach(
        (character) => {
          if (!character) {
            return;
          }

          character.style.fontVariationSettings =
            "'wght' 850, 'wdth' 100, 'ital' 0";

          character.style.opacity = "1";
        },
      );

      return;
    }

    let animationFrameId;

    const animateCharacters = () => {
      mouseRef.current.x +=
        (cursorRef.current.x -
          mouseRef.current.x) /
        15;

      mouseRef.current.y +=
        (cursorRef.current.y -
          mouseRef.current.y) /
        15;

      const title = titleRef.current;

      if (title) {
        const titleRect =
          title.getBoundingClientRect();

        const maximumDistance =
          Math.max(
            titleRect.width / 2,
            1,
          );

        characterRefs.current.forEach(
          (character) => {
            if (!character) {
              return;
            }

            const characterRect =
              character.getBoundingClientRect();

            const characterCenter = {
              x:
                characterRect.x +
                characterRect.width / 2,

              y:
                characterRect.y +
                characterRect.height / 2,
            };

            const currentDistance =
              distanceBetween(
                mouseRef.current,
                characterCenter,
              );

            const characterWidth = width
              ? Math.floor(
                  getAttributeValue(
                    currentDistance,
                    maximumDistance,
                    5,
                    200,
                  ),
                )
              : 100;

            const characterWeight = weight
              ? Math.floor(
                  getAttributeValue(
                    currentDistance,
                    maximumDistance,
                    100,
                    900,
                  ),
                )
              : 700;

            const italicValue = italic
              ? getAttributeValue(
                  currentDistance,
                  maximumDistance,
                  0,
                  1,
                ).toFixed(2)
              : 0;

            const opacityValue = alpha
              ? getAttributeValue(
                  currentDistance,
                  maximumDistance,
                  0,
                  1,
                ).toFixed(2)
              : 1;

            const settings =
              `'wght' ${characterWeight}, ` +
              `'wdth' ${characterWidth}, ` +
              `'ital' ${italicValue}`;

            if (
              character.style
                .fontVariationSettings !==
              settings
            ) {
              character.style.fontVariationSettings =
                settings;
            }

            if (alpha) {
              character.style.opacity =
                String(opacityValue);
            }
          },
        );
      }

      animationFrameId =
        window.requestAnimationFrame(
          animateCharacters,
        );
    };

    animateCharacters();

    return () => {
      window.cancelAnimationFrame(
        animationFrameId,
      );
    };
  }, [
    width,
    weight,
    italic,
    alpha,
    reduceMotion,
  ]);

  const scopedStyles = useMemo(
    () => (
      <style>{`
        @import url('${fontUrl}');

        .text-pressure-flex {
          display: flex;
          justify-content: space-between;
        }

        .text-pressure-stroke span {
          position: relative;
          color: ${textColor};
        }

        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          inset: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
    ),
    [
      fontUrl,
      textColor,
      strokeColor,
    ],
  );

  const dynamicClassName = [
    "text-pressure-title",
    flex ? "text-pressure-flex" : "",
    stroke
      ? "text-pressure-stroke"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      aria-label={text}
      className="relative h-full w-full bg-transparent"
    >
      {scopedStyles}

      <div
        ref={titleRef}
        className={dynamicClassName}
        style={{
          color: textColor,
          fontFamily,
          fontSize,
          fontWeight: 100,
          lineHeight,
          margin: 0,
          textAlign: "left",
          textTransform: "uppercase",
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "left top",
          userSelect: "none",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        {characters.map(
          (character, index) => (
            <span
              key={`${character}-${index}`}
              ref={(element) => {
                characterRefs.current[index] =
                  element;
              }}
              aria-hidden="true"
              data-char={character}
              style={{
                color: stroke
                  ? undefined
                  : textColor,

                display: "inline-block",
              }}
            >
              {character === " "
                ? "\u00A0"
                : character}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
