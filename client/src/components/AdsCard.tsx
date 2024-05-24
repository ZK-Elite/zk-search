import React from "react";
import Image from "next/image";
import Link from "next/link";
interface AdsCardProps {
  imgUrl: string;
  title: string;
  url: string;
}

const AdsCard: React.FC<AdsCardProps> = ({ imgUrl, title, url }) => {
  return (
    <div className="flex flex-row w-full h-[13vh] overflow-hidden rounded-xl ">
      <div className="relative flex w-full items-center  ">
        <Link href={url} className="w-full">
          <Image
            className="rounded-lg w-full h-full"
            src={imgUrl}
            alt={title}
            width={230}
            height={230}
          />
        </Link>
      </div>
    </div>
  );
};

export default AdsCard;
