"use client"

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from "react";

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
                                <div className="w-16 h-7 bg-transparent rounded-full z-20 flex flex-row justify-between px-1 items-center">
                                    <MoonIcon
                                        className="w-5 h-5 lg:w-5 lg:h-5 text-black dark:text-gray-500"
                                    />
                                    <SunIcon
                                        className="w-5 h-5 lg:w-5 lg:h-5 text-gray-500 dark:text-white"
                                    />
                                </div>
                                <div className={`z-10 flex justify-center items-center ease-in-out w-7 h-7 bg-white absolute rounded-full right-0 transform dark:bg-black ${theme === "light" ? "-translate-x-9" : "translate-x-0"}`}></div>
                            </div>
                        </button>
                    )
                }
            </div>
        </>
    )
}