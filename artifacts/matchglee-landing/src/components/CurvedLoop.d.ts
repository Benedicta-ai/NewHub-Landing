import type {
  ReactElement,
} from "react";

export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  respectReducedMotion?: boolean;
}

declare function CurvedLoop(
  props: CurvedLoopProps,
): ReactElement;

export default CurvedLoop;
