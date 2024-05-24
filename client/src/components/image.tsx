import Image from "next/image";
import React from "react";

interface ImageCardProps {
  imageUrl: string;
  url: string;
}

interface CustomLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const customLoader = ({ src }: CustomLoaderProps) => {
  return src;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, url }) => {
  const [error, setError] = React.useState(false);
  const handleImgError = () => {
    setError(true);
  };
  return (
    <div className="flex flex-col dark:bg-[#d3e8eb] bg-[#20292d] rounded-xl p-1 items-stretch h-full justify-between gap-2">
      <a href={url} className="w-full">
        <Image
          className="w-full md:h-[90px] rounded-lg bg-cover ease-in-out md:hover:scale-[1.1] hover:transition-all object-cover aspect-square"
          loader={customLoader}
          src={error ? "images/icons/placeholder-img.svg" : imageUrl}
          alt="image"
          width={500}
          height={500}
          onError={handleImgError}
          unoptimized
        />
      </a>
    </div>
  );
};

export default ImageCard;
