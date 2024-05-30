import { ImageExtended, ImageProps } from "./types";
import * as styles from "./styles";
import { getStyle } from "./styles";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CustomLoaderProps {
  src: string;
}

const customLoader = ({ src }: CustomLoaderProps) => {
  return src;
};

export const GalleryImage = <T extends ImageExtended>({
  item,
  thumbnailStyle,
  tileViewportStyle,
  margin,
  index,
}: ImageProps<T>): JSX.Element => {
  const styleContext = { item };

  const style = getStyle(thumbnailStyle, styles.thumbnail, styleContext);
  const thumbnailProps = {
    key: index,
    "data-testid": "grid-gallery-item_thumbnail",
    src: item.src,
    alt: item.alt ? item.alt : "",
    width: style.width as number,
    height: style.height as number,
    style: style,
  };

  const extractNEXT_PUBLIC_BASE_URL = (url: string | undefined): string => {
    try {
      if (!url) return "";
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (e) {
      return "";
    }
  };

  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return hasError ? (
    <></>
  ) : (
    <div
      className="ReactGridGallery_tile overflow-hidden"
      data-testid="grid-gallery-item"
      style={styles.galleryItem({ margin })}
    >
      <div
        className="ReactGridGallery_tile-viewport"
        data-testid="grid-gallery-item_viewport"
        style={getStyle(tileViewportStyle, styles.tileViewport, styleContext)}
      >
        <div className="flex flex-col rounded-xl overflow-hidden bg-transparent">
          <Link href={item.src} className="w-full">
            <Image
              {...thumbnailProps}
              className="rounded-lg md:hover:scale-[1.1] transition-transform duration-300 object-cover aspect-square"
              loader={customLoader}
              onError={handleError}
              alt={item.title ?? "img"}
            />
          </Link>
        </div>
        <div className="text-gray-300 dark:text-gray-700 whitespace-nowrap mt-3">
          <p className="text-md">{item.title}</p>
          <Link href={item.url as string} className="text-sm">
            {extractNEXT_PUBLIC_BASE_URL(item.url)}
          </Link>
        </div>
      </div>
    </div>
  );
};
