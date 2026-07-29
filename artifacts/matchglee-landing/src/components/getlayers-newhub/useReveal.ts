import {
  useEffect,
  useRef,
} from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  disabled?: boolean;
}

export default function useReveal<
  T extends HTMLElement,
>({
  threshold = 0.14,
  rootMargin =
    "0px 0px -8% 0px",
  disabled = false,
}: UseRevealOptions = {}) {
  const elementRef =
    useRef<T | null>(null);

  useEffect(() => {
    const element =
      elementRef.current;

    if (
      !element ||
      disabled
    ) {
      if (element) {
        element.classList.add(
          "is-visible",
        );
      }

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "is-visible",
                );

                observer.unobserve(
                  entry.target,
                );
              }
            },
          );
        },
        {
          threshold,
          rootMargin,
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    disabled,
    rootMargin,
    threshold,
  ]);

  return elementRef;
}
