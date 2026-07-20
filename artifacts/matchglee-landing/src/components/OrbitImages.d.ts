import type {
  ReactElement,
  ReactNode,
} from "react";

export interface OrbitImageItem {
  src: string;
  alt: string;
}

export interface OrbitImagesProps {
  images?: string[];
  items?: OrbitImageItem[];
  altPrefix?: string;
  shape?:
    | "circle"
    | "ellipse"
    | "square"
    | "rectangle"
    | "triangle"
    | "star"
    | "heart"
    | "infinity"
    | "wave"
    | "custom";
  customPath?: string;
  baseWidth?: number;
  baseHeight?: number;
  aspectRatio?: string;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: "normal" | "reverse";
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: string;
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
  interactive?: boolean;
  selectedIndex?: number | null;
  onItemClick?: (index: number) => void;
}

declare function OrbitImages(
  props: OrbitImagesProps,
): ReactElement;

export default OrbitImages;
