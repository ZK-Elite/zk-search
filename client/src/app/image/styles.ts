import { CSSProperties } from "react";
import {
  ImageExtended,
  StyleFunction,
  StyleFunctionContext,
  StyleProp,
} from "./types";

export const getStyle = (
  styleProp: StyleProp | undefined,
  fallback: StyleFunction,
  context: StyleFunctionContext
): CSSProperties => {
  if (typeof styleProp === "function") {
    return styleProp(context);
  }
  if (typeof styleProp === "object") {
    return styleProp;
  }
  return fallback(context);
};

export const gallery: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
};

export const thumbnail = ({ item }: { item: ImageExtended }): CSSProperties => {

  const style = {
    cursor: "pointer",
    maxWidth: "none",
    width: item.scaledWidth,
    height: item.scaledHeight,
    marginLeft: item.marginLeft,
    marginTop: 0,
  };

  return style;
};

export const tileViewport = ({
  item,
}: {
  item: ImageExtended;
}): CSSProperties => {
  const styles: CSSProperties = {
    width: item.viewportWidth,
    height: item.scaledHeight + 70,
    overflow: "hidden",
  };
  if (item.nano) {
    styles.background = `url(${item.nano})`;
    styles.backgroundSize = "cover";
    styles.backgroundPosition = "center center";
  }
  return styles;
};

export const galleryItem = ({ margin }: { margin: number }): CSSProperties => ({
  margin,
  WebkitUserSelect: "none",
  position: "relative",
  padding: "0px",
});
