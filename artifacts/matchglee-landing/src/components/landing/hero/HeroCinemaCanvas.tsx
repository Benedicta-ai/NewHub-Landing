import type {
  RefObject,
} from "react";

interface HeroCinemaCanvasProps {
  sectionRef:
    RefObject<HTMLElement | null>;
}

/*
 * Compatibility component for the previous
 * NewHub hero implementation.
 *
 * The active GetLayers rebuild uses
 * LiquidMetaHumanReveal.tsx instead.
 */
export default function HeroCinemaCanvas({
  sectionRef: _sectionRef,
}: HeroCinemaCanvasProps) {
  return null;
}
