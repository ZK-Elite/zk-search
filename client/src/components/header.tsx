"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import ThemeButton from "./theme-button";
import { buttonTabs } from "../data/contant";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [layout, setLayout] = useState(false);
  const [activeBtn, setActiveBtn] = useState(buttonTabs[0]?.value);
  const router = useRouter();
  const changeState = () => {
    setLayout(!layout);
  };
  console.log(pathname, pathname.split("/")[1]);
  return (
    <div
      className={`fixed px-5 w-full z-40 ${
        pathname !== "/" &&
        "backdrop-blur-xl bg-[#00111A] dark:bg-[#E5FCFF]"
      }`}
    >
      <div className={`flex w-full md:px-4 pt-6 items-center`}>
        <div className="w-full items-center border-b border-[#27272A]">
          {pathname !== "/" ? (
          <>
            <div className="flex items-center gap-7 justify-between">
              <Link href="/" rel="noopener noreferrer">
                <Image
                  width={30}
                  height={30}
                  src="/logo.svg"
                  alt="Zksearch-Logo"
                  className="w-12 aspect-square"
                  priority
                />
              </Link>
              <div className="hidden sm:block">
                <SearchBox />
              </div>
              <div
                className={`ml-auto ${
                  pathname === "/" && "mt-3.5"
                } cursor-pointer bg-opacity-90`}
                >
                <ThemeButton />
              </div>
            </div>
            <div className="sm:hidden block mt-4">
              <SearchBox />
            </div>
            <div className="flex flex-col mt-5 sm:pl-20" onClick={changeState}>
              <div className="flex flex-row gap-7 sm:justify-start justify-between">
                {buttonTabs.map((item, index) => (
                  <Link
                    href={`/${item?.value}/?q=${query}`}
                    className={`${
                      pathname.split("/")[1] === item?.value
                        ? "border-b-2 border-[#38E5FF] text-[#38E5FF] dark:text-[#38E5FF]"
                        : "border-b-2 border-transparent text-white dark:text-black"
                    } sm:text-lg gap-2 flex flex-row items-center pb-3`}
                    key={index}
                  >
                    <Image
                      src={item.src}
                      width={20}
                      height={20}
                      className={`h-full w-full z-[-1] ${
                        pathname.split("/")[1] === item.value
                          ? "none"
                          : "brightness-0 invert dark:brightness-0 dark:invert-0"
                      } w-5 h-5`}
                      alt="image"
                      priority
                    />
                    <span className="text-base flex font-medium">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
          ):
          <div
            className={`flex justify-end ${
              pathname === "/" && "mt-3.5"
            } cursor-pointer bg-opacity-90`}
            >
            <ThemeButton />
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
