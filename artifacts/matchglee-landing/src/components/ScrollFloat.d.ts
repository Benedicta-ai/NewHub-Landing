import type {
  ReactElement,
  ReactNode,
  RefObject,
} from "react";

export interface ScrollFloatSegment {
  text: string;
  className?: string;
}

export interface ScrollFloatProps {
  children?: ReactNode;
  segments?: ScrollFloatSegment[];
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  scrub?: boolean | number;
  tag?: string;
  respectReducedMotion?: boolean;
}

declare function ScrollFloat(
  props: ScrollFloatProps,
): ReactElement;

export default ScrollFloat;
