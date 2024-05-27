"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import Image from "next/image";
import logoImg from "../../public/logo.svg";
import { CopyIcon, CaretDownIcon } from '@radix-ui/react-icons'
import { useCopyToClipboard } from "react-use";
import { cn } from "../lib/utils";
import Link from "next/link";

interface SummaryProps {
  description: string | undefined;
  urls: string[];
}

const Summary: React.FC<SummaryProps> = ({ description, urls }) => {
  const [partialDescription, setPartialDescription] = useState("");
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (description) {
      const chunks = description.split(" ");
      const initialChunkSize = chunks.length / 1.5;
      const initialText = chunks.slice(0, initialChunkSize).join(" ");
      setPartialDescription(initialText);
    }
  }, [description]);

  useEffect(() => {
    let timer: any;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [copySuccess]);

  const handleSeeMoreClick = () => {
    setSeeMoreClicked(!seeMoreClicked);
  };

  const copyCode = () => {
    copyToClipboard(description ?? "");
    setCopySuccess(true);
  };

  const viewLink = (url: string) => {
    return url.replace(/^www\./, '');
  }

  return (
    <ScrollArea className="rounded-xl p-4" >
      <div className="flex flex-row items-center justify-between py-1 pb-6">
        <Image
          width={30}
          height={30}
          src={logoImg}
          alt="LOGO"
          className="mr-8 mt-2"
          priority
        />
        {seeMoreClicked ? (
          <button className="font-bold py-2 px-4" onClick={() => copyCode()}>
            <CopyIcon className={cn("w-5 h-5", {
              "text-white dark:text-black": !copySuccess,
              "text-[#05B7D1]": copySuccess
            })} />
          </button>
        ) : (
          <button
            className="border border-[#05B7D1] rounded-lg text-[#05B7D1] font-bold text-sm py-2 px-4 hover:bg-[#05B7D1] hover:text-white"
          >
            Stop Responding
          </button>
        )}
      </div>
      {seeMoreClicked ? (
        <>
          <p className="text-base text-white dark:text-black">{description}</p>
          <div className="sm:flex hidden flex-row gap-2 mt-4">
            {
              urls && urls.slice(0, 3).map((url, index) => {
                const match = url?.match(/^(?:https?:\/\/)?([^\/]+)/);
                const domain = match ? match[1] : null;
                return (
                  <div key={index} className="border border-[#05B7D1] rounded-full text-[#05B7D1] font-bold text-sm py-1 px-2 hover:bg-[#05B7D1] hover:text-white">
                    <Link href={url} target="_blank" className="text-[11px]">{`${index + 1}.${domain}`}</Link>
                  </div>
                );
              })
            }

          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center relative">
            <p className="text-base text-white dark:text-black">{partialDescription}</p>
            {description && description.length > partialDescription.length && (
              <div className="absolute flex bottom-0 w-full justify-center items-center pt-6 bg-gradient-to-b from-[rgba(18,30,34,0.42)] to-[rgb(18,30,34)] dark:from-[rgba(217,239,242,0.16)] dark:to-[rgb(217,239,242)]">
                <button
                  onClick={handleSeeMoreClick}
                  className="font-bold flex flex-row item-center text-sm bg-[#05B7D1] text-white py-2 px-2 mt-2 rounded-xl"
                >
                  See More
                  <CaretDownIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </ScrollArea>
  );
};

export default Summary;
