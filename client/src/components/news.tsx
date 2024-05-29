import Image from "next/image";
import React from "react";
import Link from "next/link";
import { NewsTypes } from "../data/search-types";
import { timeAgo } from "../hook/useTimeAgo";

interface NewsCardProps {
  newsUrl: string;
  title: string;
  image: string;
  date: string;
  source: string;
}
interface CustomLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const customLoader = ({ src }: CustomLoaderProps) => {
  return src;
};

const NewsCard: React.FC<NewsCardProps> = ({
  newsUrl,
  title,
  date,
  image,
  source,
}) => {
  const [error, setError] = React.useState(false);

  const handleNewsError = () => {
    setError(true);
  };

  return (
    <div className="flex flex-col dark:bg-[#d3e8eb] bg-[#20292d] rounded-xl p-3 items-stretch h-full justify-between gap-2 hover:scale-[.98] cursor-pointer transition-transform duration-300">
      <Link href={newsUrl} className="w-full">
        <Image
          className="w-full md:h-36 rounded-lg bg-cover ease-in-out hover:transition-all object-cover aspect-square"
          loader={customLoader}
          src={!image ? "images/icons/placeholder-img.svg" : image}
          alt={title}
          width={500}
          height={500}
          onError={handleNewsError}
          unoptimized
        />
      </Link>
      <p className="text-base font-medium leading-5 text-white dark:text-black line-clamp-2">
        {title}
      </p>
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm font-light leading-5 text-[#D1D5DB] dark:text-black line-clamp-1">
          {source}
        </p>
        <p className="text-sm font-light leading-5 text-[#D1D5DB] dark:text-black">
          {timeAgo(date)}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
