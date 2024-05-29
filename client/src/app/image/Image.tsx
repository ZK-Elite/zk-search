import { ImageExtended, ImageProps } from "./types";
import * as styles from "./styles";
import { getStyle } from "./styles";

export const Image = <T extends ImageExtended>({
  item,
  thumbnailStyle,
  tileViewportStyle,
  margin,
  index,
}: ImageProps<T>): JSX.Element => {
  const styleContext = { item };

  const thumbnailProps = {
    key: index,
    "data-testid": "grid-gallery-item_thumbnail",
    src: item.src,
    alt: item.alt ? item.alt : "",
    style: getStyle(thumbnailStyle, styles.thumbnail, styleContext),
  };

  const extractDomain = (url: string | undefined): string => {
    try {
      if (!url) return ''
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (e) {
      return '';
    }
  }

  return (
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
          <a href={item.src} className="w-full">
            <img {...thumbnailProps} className="rounded-lg md:hover:scale-[1.1] hover:transition-all object-cover aspect-square"></img>
          </a>
        </div>
        <div className="text-white whitespace-nowrap mt-3">
          <p className="text-md">{item.title}</p>
          <a href={item.url} className="text-sm">{extractDomain(item.url)}</a>
        </div>
      </div>
      {/* <div
        className="ReactGridGallery_tile-viewport text-white whitespace-nowrap"
        data-testid="grid-gallery-item_viewport"
        style={getStyle(tileViewportStyle, styles.tileViewport, styleContext)}
      >
        <div className="text-md">{item.title}</div>
        <a href={item.url} className="text-sm">{extractDomain(item.url)}</a>
      </div> */}
    </div>
  );
};
