import { ScrollArea } from "../components/ui/scroll-area";

import { OrganicResult } from "../data/googletypes";
import Link from "next/link";
import React from "react";
const RelevantLinks: React.FC<{ links: OrganicResult[] }> = ({ links }) => {
  console.log(links);

  return (
    <ScrollArea className="dark:bg-[#d3e8eb] bg-[#20292d] rounded-xl p-4">
      <div className="relevant-links">
        {links?.map((link, index) => {
          return (
            <div key={index} className="relevant-link">
              <div className="flex flex-col items-start gap-3">
                <Link
                  href={link.link}
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2"
                >
                  <div className="flex flex-row">
                    {link.pagemap?.cse_image?.[0].src && (
                      <img
                        alt="images"
                        src={link.pagemap.cse_image[0].src}
                        className="w-5 h-5 rounded-full mr-3"
                      />
                    )}
                    <p className="text-[13px] font-normal hover:text-[#38E5FF] text-[#D1D5DB] dark:text-black leading-6">
                      {"https://"}
                      {link.displayLink}
                    </p>
                  </div>
                  <p className="text-white dark:text-black text-lg font-medium leading-6">
                    {link.title}
                  </p>
                  <p className="text-base font-medium text-[#D1D5DB] dark:text-black">
                    {link.snippet}
                  </p>
                </Link>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default RelevantLinks;
