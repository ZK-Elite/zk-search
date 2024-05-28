"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [isClient, setIsClient] = useState<boolean>(false);
    useEffect(() => { setIsClient(true) }, []);
    return (
        <>
            <div className="flex items-center dark:text-white">
                {
                    isClient && (
                        <button className="cursor-pointer" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
                            <div className="relative flex items-center mx-2 border-gray-500 border-2 rounded-full">
                                <div className="w-16 h-7 bg-transparent rounded-full z-20 flex flex-row justify-between px-1.5 items-center">
                                    <Image
                                        src={"images/icons/moon.svg"}
                                        width={16}
                                        height={16}
                                        alt="moon"
                                        className="w-4 h-4"
                                        style={{
                                            filter: theme === "light" ? "brightness(0) invert(1)" : "invert(14%) sepia(7%) saturate(194%) hue-rotate(180deg) brightness(95%) contrast(88%)"
                                        }}
                                    />
                                    <Image
                                        src={"images/icons/sun.svg"}
                                        width={16}
                                        height={16}
                                        alt="sun"
                                        className="w-4 h-4"
                                        style={{
                                            filter: theme === "light" ? "invert(14%) sepia(7%) saturate(194%) hue-rotate(180deg) brightness(95%) contrast(88%)" : "brightness(0)"
                                        }}
                                    />
                                </div>
                                <div className={`z-10 flex justify-center items-center ease-in-out w-7 h-7 dark:bg-white absolute rounded-full right-0 transform bg-black ${theme === "light" ? "-translate-x-9" : "translate-x-0"}`}></div>
                            </div>
                        </button>
                    )
                }
            </div>
        </>
    )
}