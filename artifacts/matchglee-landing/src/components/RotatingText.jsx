"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import "./RotatingText.css";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef(
  (
    {
      texts = [],
      transition = {
        type: "spring",
        damping: 30,
        stiffness: 400,
      },
      initial = {
        y: "100%",
        opacity: 0,
      },
      animate = {
        y: 0,
        opacity: 1,
      },
      exit = {
        y: "-120%",
        opacity: 0,
      },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2800,
      staggerDuration = 0.025,
      staggerFrom = "last",
      loop = true,
      auto = true,
      pauseOnHover = true,
      splitBy = "characters",
      onNext,
      mainClassName = "",
      splitLevelClassName = "",
      elementLevelClassName = "",
      respectReducedMotion = true,
      ...rest
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] =
      useState(0);

    const [isPaused, setIsPaused] =
      useState(false);

    const prefersReducedMotion =
      Boolean(useReducedMotion());

    const reducedMotion =
      respectReducedMotion &&
      prefersReducedMotion;

    const safeTexts =
      Array.isArray(texts) && texts.length > 0
        ? texts
        : [""];

    const splitIntoCharacters = useCallback(
      (text) => {
        if (
          typeof Intl !== "undefined" &&
          Intl.Segmenter
        ) {
          const segmenter =
            new Intl.Segmenter("en", {
              granularity: "grapheme",
            });

          return Array.from(
            segmenter.segment(text),
            (segment) => segment.segment,
          );
        }

        return Array.from(text);
      },
      [],
    );

    const elements = useMemo(() => {
      const currentText =
        safeTexts[currentTextIndex] ??
        safeTexts[0] ??
        "";

      if (splitBy === "characters") {
        return currentText
          .split(" ")
          .map((word, index, words) => ({
            characters:
              splitIntoCharacters(word),

            needsSpace:
              index !== words.length - 1,
          }));
      }

      if (splitBy === "words") {
        return currentText
          .split(" ")
          .map((word, index, words) => ({
            characters: [word],
            needsSpace:
              index !== words.length - 1,
          }));
      }

      if (splitBy === "lines") {
        return currentText
          .split("\n")
          .map((line, index, lines) => ({
            characters: [line],
            needsSpace:
              index !== lines.length - 1,
          }));
      }

      return currentText
        .split(splitBy)
        .map((part, index, parts) => ({
          characters: [part],
          needsSpace:
            index !== parts.length - 1,
        }));
    }, [
      safeTexts,
      currentTextIndex,
      splitBy,
      splitIntoCharacters,
    ]);

    const totalCharacters = useMemo(
      () =>
        elements.reduce(
          (total, word) =>
            total +
            word.characters.length,
          0,
        ),
      [elements],
    );

    const getStaggerDelay = useCallback(
      (index) => {
        if (reducedMotion) {
          return 0;
        }

        if (staggerFrom === "first") {
          return index * staggerDuration;
        }

        if (staggerFrom === "last") {
          return (
            (totalCharacters - 1 - index) *
            staggerDuration
          );
        }

        if (staggerFrom === "center") {
          const center =
            Math.floor(
              totalCharacters / 2,
            );

          return (
            Math.abs(center - index) *
            staggerDuration
          );
        }

        if (
          typeof staggerFrom === "number"
        ) {
          return (
            Math.abs(
              staggerFrom - index,
            ) * staggerDuration
          );
        }

        return index * staggerDuration;
      },
      [
        reducedMotion,
        staggerFrom,
        staggerDuration,
        totalCharacters,
      ],
    );

    const handleIndexChange =
      useCallback(
        (newIndex) => {
          setCurrentTextIndex(newIndex);
          onNext?.(newIndex);
        },
        [onNext],
      );

    const next = useCallback(() => {
      setCurrentTextIndex(
        (currentIndex) => {
          const finalIndex =
            safeTexts.length - 1;

          const nextIndex =
            currentIndex === finalIndex
              ? loop
                ? 0
                : currentIndex
              : currentIndex + 1;

          if (
            nextIndex !== currentIndex
          ) {
            onNext?.(nextIndex);
          }

          return nextIndex;
        },
      );
    }, [
      safeTexts.length,
      loop,
      onNext,
    ]);

    const previous = useCallback(() => {
      const previousIndex =
        currentTextIndex === 0
          ? loop
            ? safeTexts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;

      if (
        previousIndex !==
        currentTextIndex
      ) {
        handleIndexChange(
          previousIndex,
        );
      }
    }, [
      currentTextIndex,
      safeTexts.length,
      loop,
      handleIndexChange,
    ]);

    const jumpTo = useCallback(
      (index) => {
        const validIndex = Math.max(
          0,
          Math.min(
            index,
            safeTexts.length - 1,
          ),
        );

        if (
          validIndex !== currentTextIndex
        ) {
          handleIndexChange(
            validIndex,
          );
        }
      },
      [
        safeTexts.length,
        currentTextIndex,
        handleIndexChange,
      ],
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [
      currentTextIndex,
      handleIndexChange,
    ]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [
        next,
        previous,
        jumpTo,
        reset,
      ],
    );

    useEffect(() => {
      if (
        !auto ||
        isPaused ||
        reducedMotion ||
        safeTexts.length <= 1
      ) {
        return undefined;
      }

      const intervalId =
        window.setInterval(
          next,
          rotationInterval,
        );

      return () => {
        window.clearInterval(
          intervalId,
        );
      };
    }, [
      auto,
      isPaused,
      reducedMotion,
      safeTexts.length,
      next,
      rotationInterval,
    ]);

    const currentText =
      safeTexts[currentTextIndex] ??
      safeTexts[0] ??
      "";

    const motionTransition =
      reducedMotion
        ? {
            duration: 0,
          }
        : transition;

    const initialState =
      reducedMotion
        ? false
        : initial;

    const animateState =
      reducedMotion
        ? {
            y: 0,
            opacity: 1,
          }
        : animate;

    const exitState =
      reducedMotion
        ? {
            opacity: 0,
          }
        : exit;

    return (
      <motion.span
        className={cn(
          "text-rotate",
          mainClassName,
        )}
        onMouseEnter={() => {
          if (pauseOnHover) {
            setIsPaused(true);
          }
        }}
        onMouseLeave={() => {
          if (pauseOnHover) {
            setIsPaused(false);
          }
        }}
        {...rest}
      >
        <span className="text-rotate-sr-only">
          {currentText}
        </span>

        <AnimatePresence
          mode={animatePresenceMode}
          initial={
            animatePresenceInitial
          }
        >
          <motion.span
            key={currentTextIndex}
            className={cn(
              splitBy === "lines"
                ? "text-rotate-lines"
                : "text-rotate-content",
            )}
            aria-hidden="true"
          >
            {elements.map(
              (
                wordObject,
                wordIndex,
                array,
              ) => {
                const previousCharacterCount =
                  array
                    .slice(0, wordIndex)
                    .reduce(
                      (
                        total,
                        word,
                      ) =>
                        total +
                        word.characters
                          .length,
                      0,
                    );

                return (
                  <span
                    key={wordIndex}
                    className={cn(
                      "text-rotate-word",
                      splitLevelClassName,
                    )}
                  >
                    {wordObject.characters.map(
                      (
                        character,
                        characterIndex,
                      ) => (
                        <motion.span
                          key={
                            characterIndex
                          }
                          initial={
                            initialState
                          }
                          animate={
                            animateState
                          }
                          exit={
                            exitState
                          }
                          transition={{
                            ...motionTransition,

                            delay:
                              getStaggerDelay(
                                previousCharacterCount +
                                  characterIndex,
                              ),
                          }}
                          className={cn(
                            "text-rotate-element",
                            elementLevelClassName,
                          )}
                        >
                          {character}
                        </motion.span>
                      ),
                    )}

                    {wordObject.needsSpace && (
                      <span className="text-rotate-space">
                        {" "}
                      </span>
                    )}
                  </span>
                );
              },
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  },
);

RotatingText.displayName =
  "RotatingText";

export default RotatingText;
