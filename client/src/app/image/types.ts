import { MouseEvent, CSSProperties, ReactNode, ComponentType } from "react";

type Key = string | number;

export interface ImageTag {
  value: ReactNode;
  title: string;
  key?: Key;
}

export interface Image {
  key?: Key;
  src: string;
  width: number;
  height: number;
  nano?: string;
  alt?: string;
  title?: string;
  url?: string;
}

export type ImageExtended<T extends Image = Image> = T & {
  scaledWidth: number;
  scaledHeight: number;
  viewportWidth: number;
  marginLeft: number;
};

export interface BuildLayoutOptions {
  containerWidth: number;
  maxRows?: number;
  rowHeight?: number;
  margin?: number;
}

export type ImageExtendedRow<T extends Image = Image> = ImageExtended<T>[];

export type EventHandler<T extends Image = Image> = (
  index: number,
  item: T,
  event: MouseEvent<HTMLElement>
) => void;

export type StyleFunctionContext<T extends Image = Image> = {
  item: ImageExtended;
};

export type StyleFunction<T extends Image = Image> = (
  context: StyleFunctionContext
) => CSSProperties;

export type StyleProp<T extends Image = Image> =
  | CSSProperties
  | StyleFunction<T>;

export interface ImageProps<T extends ImageExtended = ImageExtended> {
  item: T;
  index: number;
  margin: number;
  tileViewportStyle: StyleProp<T> | undefined;
  thumbnailStyle: StyleProp<T> | undefined;
  height?: number;
  thumbnailImageComponent?: ComponentType<ThumbnailImageProps>;
}

export interface ThumbnailImageComponentImageProps {
  key: string | number;
  src: string;
  alt: string;
  title: string | null;
  style: CSSProperties;
}

export type ThumbnailImageProps<T extends ImageExtended = ImageExtended> =
  ImageProps<T> & {
    imageProps: ThumbnailImageComponentImageProps;
  };

export interface GalleryProps<T extends Image = Image> {
  images: T[];
  id?: string;
  rowHeight?: number;
  maxRows?: number;
  margin?: number;
  defaultContainerWidth?: number;
  tileViewportStyle?: StyleProp<T>;
  thumbnailStyle?: StyleProp<T>;
  thumbnailImageComponent?: ComponentType<ThumbnailImageProps>;
}
