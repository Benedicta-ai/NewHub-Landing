import type {
  CSSProperties,
  ReactNode,
} from "react";

import "./ScrollStack.css";

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  stackOffset?: number;
  stackIndex?: number;
}

export function ScrollStackItem({
  children,
  itemClassName = "",
  stackOffset = 0,
  stackIndex = 0,
}: ScrollStackItemProps) {
  const style = {
    "--scroll-stack-offset": `${stackOffset}px`,
    "--scroll-stack-index": stackIndex,
  } as CSSProperties;

  return (
    <div
      className={`scroll-stack-card ${itemClassName}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  stackTopDesktop?: number;
  stackTopMobile?: number;
  cardDistance?: number;
  endDistance?: number;
}

export default function ScrollStack({
  children,
  className = "",
  stackTopDesktop = 360,
  stackTopMobile = 310,
  cardDistance = 230,
  endDistance = 760,
}: ScrollStackProps) {
  const style = {
    "--scroll-stack-top-desktop":
      `${stackTopDesktop}px`,

    "--scroll-stack-top-mobile":
      `${stackTopMobile}px`,

    "--scroll-stack-card-distance":
      `${cardDistance}px`,

    "--scroll-stack-end-distance":
      `${endDistance}px`,
  } as CSSProperties;

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      style={style}
    >
      <div className="scroll-stack-inner">
        {children}

        <div
          className="scroll-stack-end"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
