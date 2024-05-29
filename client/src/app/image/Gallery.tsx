import { GalleryImage } from "./Image";
import { useContainerWidth } from "./useContainerWidth";
import { buildLayoutFlat } from "./buildLayout";
import { Image as ImageInterface, GalleryProps } from "./types";
import * as styles from "./styles";

export const Gallery = <T extends ImageInterface>({
  images,
  id = "ReactGridGallery",
  rowHeight = 180,
  maxRows,
  margin = 2,
  defaultContainerWidth = 0,
  tileViewportStyle,
  thumbnailStyle,
  thumbnailImageComponent,
}: GalleryProps<T>): JSX.Element => {
  const { containerRef, containerWidth } = useContainerWidth(
    defaultContainerWidth
  );

  const thumbnails = buildLayoutFlat<T>(images, {
    containerWidth,
    maxRows,
    rowHeight,
    margin,
  });

  return (
    <div id={id} className="ReactGridGallery" ref={containerRef}>
      <div style={styles.gallery}>
        {thumbnails.map((item, index) => (
          <GalleryImage
            key={item.key || index}
            item={item}
            index={index}
            margin={margin}
            height={rowHeight}
            tileViewportStyle={tileViewportStyle}
            thumbnailStyle={thumbnailStyle}
            thumbnailImageComponent={thumbnailImageComponent}
          />
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = "Gallery";
