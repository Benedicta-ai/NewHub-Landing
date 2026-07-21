import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  segments,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
  scrub = true,
  tag = "h2",
  respectReducedMotion = true,
}) {
  const containerRef = useRef(null);

  const normalizedSegments = useMemo(() => {
    if (
      Array.isArray(segments) &&
      segments.length > 0
    ) {
      return segments;
    }

    return [
      {
        text:
          typeof children === "string"
            ? children
            : "",
        className: "",
      },
    ];
  }, [children, segments]);

  const accessibleText = useMemo(
    () =>
      normalizedSegments
        .map((segment) => segment.text)
        .join(""),
    [normalizedSegments],
  );

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const characterElements =
      element.querySelectorAll(
        "[data-scroll-float-character]",
      );

    if (!characterElements.length) {
      return;
    }

    const reducedMotion =
      respectReducedMotion &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const scroller =
      scrollContainerRef?.current ??
      window;

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(characterElements, {
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          clearProps: "willChange",
        });

        return;
      }

      gsap.fromTo(
        characterElements,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
          willChange:
            "opacity, transform",
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: element,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub,
            invalidateOnRefresh: true,
          },
          onComplete: () => {
            gsap.set(characterElements, {
              clearProps: "willChange",
            });
          },
        },
      );
    }, element);

    const refreshFrame =
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

    return () => {
      window.cancelAnimationFrame(
        refreshFrame,
      );

      context.revert();
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    scrub,
    respectReducedMotion,
    normalizedSegments,
  ]);

  const Tag = tag;

  return (
    <Tag
      ref={containerRef}
      aria-label={accessibleText}
      className={`
        scroll-float
        ${containerClassName}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          scroll-float-text
          ${textClassName}
        `}
      >
        {normalizedSegments.map(
          (segment, segmentIndex) => (
            <span
              key={`${segment.text}-${segmentIndex}`}
              className="scroll-float-segment"
            >
              {segment.text
                .split(/(\s+)/)
                .map(
                  (
                    token,
                    tokenIndex,
                  ) => {
                    if (
                      /^\s+$/.test(token)
                    ) {
                      return (
                        <span
                          key={`space-${segmentIndex}-${tokenIndex}`}
                          className="scroll-float-space"
                        >
                          {" "}
                        </span>
                      );
                    }

                    return (
                      <span
                        key={`word-${segmentIndex}-${tokenIndex}`}
                        className="scroll-float-word"
                      >
                        {Array.from(
                          token,
                        ).map(
                          (
                            character,
                            characterIndex,
                          ) => (
                            <span
                              key={`${segmentIndex}-${tokenIndex}-${characterIndex}`}
                              data-scroll-float-character="true"
                              className={`
                                scroll-float-character
                                ${segment.className ?? ""}
                              `}
                            >
                              {character}
                            </span>
                          ),
                        )}
                      </span>
                    );
                  },
                )}
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}
