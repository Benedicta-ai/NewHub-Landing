import type { ReactElement } from "react";

export interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
  maxFontSize?: number;
  respectReducedMotion?: boolean;
}

declare function TextPressure(
  props: TextPressureProps,
): ReactElement;

export default TextPressure;
