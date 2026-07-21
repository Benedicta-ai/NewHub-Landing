import type {
  CSSProperties,
  ReactElement,
} from "react";

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  shuffleDirection?:
    | "left"
    | "right"
    | "up"
    | "down";
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: string;
  textAlign?:
    | "left"
    | "center"
    | "right";
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: "evenodd" | "random";
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

declare function Shuffle(
  props: ShuffleProps,
): ReactElement;

export default Shuffle;
