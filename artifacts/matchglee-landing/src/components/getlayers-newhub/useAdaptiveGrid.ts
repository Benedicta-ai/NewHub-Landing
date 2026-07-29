import {
  useEffect,
} from "react";

const FONT_BASE = 16;
const BASE_WIDTH = 1920;
const SCALE_COEFFICIENT =
  0.6666;

export default function useAdaptiveGrid() {
  useEffect(() => {
    const applyAdaptiveGrid =
      () => {
        const viewportWidth =
          window.innerWidth;

        const widthReduction =
          ((BASE_WIDTH -
            viewportWidth) /
            BASE_WIDTH) *
          100;

        const fontSize =
          FONT_BASE -
          (FONT_BASE *
            (widthReduction *
              SCALE_COEFFICIENT)) /
            100;

        if (
          fontSize >
          FONT_BASE
        ) {
          document.documentElement.style.fontSize =
            `${fontSize}px`;
        } else {
          document.documentElement.style.removeProperty(
            "font-size",
          );
        }
      };

    applyAdaptiveGrid();

    window.addEventListener(
      "resize",
      applyAdaptiveGrid,
    );

    return () => {
      window.removeEventListener(
        "resize",
        applyAdaptiveGrid,
      );

      document.documentElement.style.removeProperty(
        "font-size",
      );
    };
  }, []);
}
