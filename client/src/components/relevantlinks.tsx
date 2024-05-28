import React from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { QueryTypes } from "../data/search-types";
import Link from "next/link";

interface IRelevantTypes {
  links: QueryTypes[];
  type?: string;
}
const RelevantLinks: React.FC<IRelevantTypes> = ({ links, type }) => {

  return (
    <ScrollArea
      className="dark:bg-[#d3e8eb] bg-[#20292d] rounded-xl p-4"
    >
      <div className="relevant-links">
        {links?.map((link, index) => {
          return (
            <div key={index} className="relevant-link">
              <div className="flex flex-col items-start gap-3">
                <Link href={link.href} rel="noopener noreferrer" className="flex flex-col gap-2">
                  <div className="flex flex-row">
                    <p className="text-[13px] font-normal hover:text-[#38E5FF] text-[#D1D5DB] dark:text-black leading-6">
                      {`${type === "more" ? index + 11 : index + 1}. https://${link.title}`}
                    </p>
                  </div>
                  <p className="text-white dark:text-black text-lg font-medium leading-6">{link.title}</p>
                  <p className="text-base font-medium text-[#D1D5DB] dark:text-black">{link.body}</p>
                </Link>
              </div>
              <br />
            </div>
          )
        })}
      </div>
    </ScrollArea>
  );
};

export default RelevantLinks;
