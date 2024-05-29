"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import logoImg from "../../public/logo.svg";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <footer
      className={`w-full px-10  fixed bottom-0 bg-opacity-70 border-t border-[#27272A] ${
        pathname !== "/" &&
        "backdrop-blur-xl bg-[#00111A] dark:bg-[#E5FCFF] max-sm:hidden "
      }`}
    >
      <div
        className={`flex justify-center sm:justify-between items-center gap-4  ${
          pathname !== "/" ? "py-3" : "py-6"
        } flex-wrap w-full  `}
      >
        <div className="flex flex-row min-w-[300px] max-sm:justify-center w-full sm:w-1/2 items-center">
          <Link
            href="https://www.zkml.systems/"
            rel="noopener noreferrer"
            className="max-sm:mr-3 "
          >
            <Image
              width={32}
              height={32}
              src={logoImg}
              className="footerImg ml-2"
              alt="logoimg"
              priority
              style={{
                width: "32px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://www.zkml.systems/" rel="noopener noreferrer">
            <p className="mx-2 text-white dark:text-black">ZKML</p>
          </Link>
          {/* <div className="pl-10">
            <Link href="https://www.zkml.systems/" rel="noopener noreferrer">
              <Image
                width={32}
                height={32}
                src={"images/icons/zwap-2d.svg"}
                className="footerImg ml-2 w-10"
                alt="logoimg"
                priority
              />
            </Link>
          </div> */}
        </div>
        <div className=" flex">
          <a href="https://twitter.com/ZKMLsystems" rel="noopener noreferrer">
            <Image
              src={"images/icons/twitter-x.svg"}
              width={20}
              height={20}
              alt="twitter"
              className="twitterIcon mr-4"
              style={{
                filter:
                  theme === "dark"
                    ? "brightness(0)"
                    : "brightness(0) invert(1)",
              }}
            />
          </a>
          <p className="mx-4 text-sm text-[#FFFFFF33] dark:text-black">{"|"}</p>
          <Link href="https://t.me/zkmlsystems" rel="noopener noreferrer">
            <Image
              width={20}
              height={20}
              src={"images/icons/telegram-out.svg"}
              alt="telegram"
              className="telegramIcon mr-2"
              style={{
                filter:
                  theme === "dark"
                    ? "brightness(0)"
                    : "brightness(0) invert(1)",
              }}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
