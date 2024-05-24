import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the prop types using TypeScript
type RelatedLinkProps = {
  link: string;
  query: string;
};

const RelatedLink: React.FC<RelatedLinkProps> = ({ link, query }) => {
  return (
    <div
      className="dark:bg-[#d3e8eb] bg-[#20292d] video-containers rounded-xl p-4"
    >
      <div className="flex h-6 items-center text-white">
        <div className="mr-3 h-5 w-5 text-gray-500">
          <Image
            src="images/icons/search-normal.svg"
            alt="Search Icon"
            width={25}
            height={25}
            className="w-4 h-4"
          />
        </div>
        <p className="relatedlink-text-container text-truncate inline-block text-base text-white dark:text-black">
          <Link href={link}>{query}</Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedLink;
