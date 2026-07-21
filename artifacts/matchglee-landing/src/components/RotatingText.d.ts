import type {
  ReactElement,
  Ref,
} from "react";

export interface RotatingTextHandle {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: string[];
  transition?: Record<string, unknown>;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  animatePresenceMode?:
    | "sync"
    | "wait"
    | "popLayout";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?:
    | "first"
    | "last"
    | "center"
    | number;
  loop?: boolean;
  auto?: boolean;
  pauseOnHover?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  respectReducedMotion?: boolean;
  ref?: Ref<RotatingTextHandle>;
}

declare function RotatingText(
  props: RotatingTextProps,
): ReactElement;

export default RotatingText;
