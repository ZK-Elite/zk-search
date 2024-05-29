"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBox from "./searchbox";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { usePathname } from "next/navigation";

import logoImg from "../../public/logo.svg";
import ThemeButton from "./theme-button";
import { buttonTabs } from "../data/contant";

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
  return (
    <div
      className={`fixed px-5 w-full z-40 ${pathname === "/search" && "backdrop-blur"
        }`}
    >
      <div className="flex w-full md:px-4 pt-6 pb-4 items-end">
        {(pathname === "/search" || pathname === "/videos" || pathname === "/news") && (
          <div className="flex sm:flex-row flex-col w-full gap-3">
            <div className="flex items-center justify-start md:w-20 w-full">
              <a
                href="https://zksearch.zkml.systems/"
                rel="noopener noreferrer"
              >
                <Image
                  width={30}
                  height={30}
                  src={logoImg}
                  alt="LOGO"
                  className="m-2"
                  priority
                />
              </a>
              <div
                className={`ml-auto flex sm:hidden cursor-pointer bg-opacity-70`}
              >
                <ThemeButton />
              </div>
            </div>
            <div className="sm:fixed sm:ml-14" onClick={changeState}>
              <SearchBox />
            </div>
          </div>
        )}
        <div
          className={`ml-auto sm:flex ${pathname === "/search" && "hidden"
            } cursor-pointer bg-opacity-70 ${pathname === "/" && "mt-3.5"}`}
        >
          <ThemeButton />
        </div>
      </div>
      {(pathname === "/search" || pathname === "/videos" || pathname === "/news") && (
        <div className="flex flex-row sm:gap-5 sm:justify-start justify-between sm:ml-[72px]">
          {buttonTabs.map((item, index) => (
            <button
              className={`${activeBtn === item?.value
                ? "border-b-2 border-[#38E5FF] text-[#38E5FF] dark:text-[#38E5FF]"
                : "border-b-2 border-transparent text-white dark:text-black"
                } sm:text-lg gap-2 flex flex-row items-center pb-3`}
              key={item?.value}
              onClick={
                () => {
                  setActiveBtn(item?.value)
                  if(item?.value==="all")
                    router.push('/' + 'search' + '/?q=' + query)
                  else 
                    router.push('/' + item?.value + '/?q=' + query)
                }
              }
            >
              <Image
                src={item.src}
                width={20}
                height={20}
                className={`h-full w-full z-[-1] ${activeBtn === item.value
                  ? "none"
                  : "brightness-0 invert dark:brightness-0 dark:invert-0"
                  }`}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                alt="image"
                priority
              />
              <span className="text-base hidden sm:flex font-medium">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      )}

      <div
        className={`${pathname === "/search" &&
          "mx-4 border-b border-[#27272A] sm:flex hidden"
          }`}
      ></div>
    </div>
  );
};

export default Header;
