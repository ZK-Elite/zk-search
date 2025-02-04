'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import logoImg from "../../public/logo.svg";

const Footer = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => { setIsClient(true) }, []);
  return (
    <footer
      className={`w-full px-10 fixed bottom-0 bg-opacity-70 ${pathname === "/search" && "backdrop-blur"
        }`}
    >
      {
        isClient && (
          <div className={`mx-auto sm:flex hidden flex-row w-full items-center border-t border-[#7E7E7E] ${pathname === "/search" ? "py-3" : "py-6"}`}>
            <a
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
                  height: 'auto'
                }}
              />
            </a>
            <a href="https://www.zkml.systems/" rel="noopener noreferrer">
              <p className="mx-2 text-white dark:text-black">ZKML</p>
            </a>
            <div className="pl-10">
              <a href="https://www.zkml.systems/"
                rel="noopener noreferrer">
                <Image
                  width={32}
                  height={32}
                  src={"images/icons/zwap-2d.svg"}
                  className="footerImg ml-2"
                  alt="logoimg"
                  priority
                  style={{
                    width: "32px",
                    height: 'auto'
                  }}
                />
              </a>
            </div>
            <div className="ml-auto flex">
              <a
                href="https://zkml.gitbook.io/doc/introduction"
                className="mx-4 text-sm  text-white dark:text-black"
              >
                Privacy Policy
              </a>
              <p className="mx-4 text-sm text-[#FFFFFF33] dark:text-black">{"|"}</p>
              <a href="https://twitter.com/ZKMLsystems" rel="noopener noreferrer">
                <Image
                  src={"images/icons/twitter-x.svg"}
                  width={20}
                  height={20}
                  alt="twitter"
                  className="twitterIcon mr-4"
                  style={{
                    filter: theme === "dark" ? "brightness(0)" : "brightness(0) invert(1)"
                  }}
                />
              </a>
              <p className="mx-4 text-sm text-[#FFFFFF33] dark:text-black">{"|"}</p>
              <a href="https://t.me/zkmlsystems" rel="noopener noreferrer">
                <Image
                  width={20}
                  height={20}
                  src={"images/icons/telegram-out.svg"}
                  alt="telegram"
                  className="telegramIcon mr-2"
                  style={{
                    filter: theme === "dark" ? "brightness(0)" : "brightness(0) invert(1)"
                  }}
                />
              </a>
            </div>
          </div>
        )
      }

    </footer>
  );
};

export default Footer;
