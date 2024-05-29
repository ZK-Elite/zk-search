import Image from "next/image";
import React from "react";
import Link from "next/link";
interface VideoCardProps {
  content: string;
  description: string;
  src: string;
  duration: string;
  title: string;
  publisher: string;
}
interface CustomLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const customLoader = ({ src }: CustomLoaderProps) => {
  return src;
};

const VideoCard: React.FC<VideoCardProps> = ({
  content,
  description,
  src,
  duration,
  publisher,
  title,
}) => {
  const [error, setError] = React.useState(false);

  const handleImgError = () => {
    setError(true);
  };

  return (
    <div className="flex flex-col dark:bg-[#d3e8eb] bg-[#20292d] rounded-xl p-3 items-stretch h-full justify-between gap-2 hover:scale-[.98] cursor-pointer transition-transform duration-300">
      <Link href={content} className="w-full">
        <Image
          className="w-full md:h-36 rounded-lg bg-cover ease-in-out hover:transition-all object-cover aspect-square"
          loader={customLoader}
          src={error ? "images/icons/placeholder-img.svg" : src}
          alt={title}
          width={1500}
          height={1500}
          onError={handleImgError}
          unoptimized
        />
      </Link>
      <p className="text-base font-medium leading-5 text-white dark:text-black line-clamp-2">
        {title}
      </p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm font-light leading-5 text-[#D1D5DB] dark:text-black">
          {publisher}
        </p>
        <p className="text-sm font-light leading-5 text-[#D1D5DB] dark:text-black">
          {duration}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
