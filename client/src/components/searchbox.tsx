"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "./ui/input";
import axios from "axios";
import { cn } from "../lib/utils";
import { SuggestTypes } from "../data/search-types";

interface SearchComponentProps {
  className?: string;
  layout?: boolean;
}

const SearchBox: React.FC<SearchComponentProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // search function
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    const term = searchInputRef.current?.value || "";
    if (!term.trim()) return;
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  // handle input change function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== "") {
      setOpen(true);
      fetchSuggestions(newQuery);
    } else {
      setOpen(false);
      setSuggestions([]);
    }
  };

  // handle click outside function
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // fetch suggestions
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await axios.post("/api/suggest", {
        query: input,
      });
      setSuggestions(response.data.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // handle suggestions function
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <>
      <div className="relative w-full">
        <div
          className={`absolute -inset-x-4 -inset-y-6 bg-gradient-to-r from-[#38e4fff6] to-[#38E5FF80]  rounded-xl blur-2xl opacity-50  `}
        />
        <div
          className={cn(
            `relative flex flex-col justify-center w-full items-center  bg-[#121e22]   ${
              !open || suggestions?.length == 0
                ? "rounded-[14px] "
                : "rounded-t-[14px]  "
            }  px-5 py-1 md:w-[552px] ${
              pathname === "/"
                ? `border-2 border-[#38E5FF] ${
                    open && "border-b-0"
                  } dark:bg-[#cbf8ffbd]`
                : "border border-[#27272A]  dark:bg-[#d3e8eb] "
            } `
          )}
        >
          <div
            className="flex flex-col justify-center items-center w-full"
            ref={dropdownRef}
          >
            <form
              onSubmit={search}
              className="flex flex-col justify-center items-center w-full"
            >
              <div className="flex justify-center items-center w-full relative">
                <Image
                  width={22}
                  height={22}
                  src="images/icons/search-normal.svg"
                  alt="Search Icon"
                  className="h-5 w-5 text-gray-500 mr-3 absolute left-3"
                />

                <Input
                  ref={searchInputRef}
                  value={query}
                  onChange={handleInputChange}
                  type="search"
                  placeholder="What are you looking for?"
                  className="text-white dark:text-black text-base mb-8 m-auto bg-transparent focus:outline-none focus:border-none border-none focus:ring-none hover:bg-transparent outline-none pl-10"
                />
              </div>

              {open && (
                <div
                  className={`absolute ${
                    pathname === "/"
                      ? "border-2 -left-[2px] right-1 border-[#38E5FF] dark:bg-[#cbf8ffbd]"
                      : "border border-[#27272aee] -left-[1px] right-0  dark:bg-[#d3e8eb] "
                  } bg-gradient-to-b from-[#121e22] to-[#121e22ab] flex border-t-0 flex-col top-full  rounded-b-lg   md:w-[552px] w-full  z-50`}
                >
                  {suggestions?.length > 0 && (
                    <div className="h-[1px] border-solid border border-[#27272A] mx-auto w-[90%] bg-[#27272A] mt-0" />
                  )}
                  {
                    <div
                      className={`flex gap-3 px-4 flex-col ${
                        suggestions.length > 0 && "py-4"
                      }`}
                    >
                      {suggestions?.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="pl-3 py-2 cursor-pointer hover:bg-[#FFFFFF] hover:bg-opacity-[0.07] flex flex-row items-center justify-start rounded-lg"
                        >
                          <Image
                            width={15}
                            height={15}
                            src="images/icons/search-normal.svg"
                            alt="Search Icon"
                            className="h-3.5 w-3.5 text-gray-500 mr-3"
                          />
                          <p className="text-white dark:text-black text-sm font-medium">
                            {suggestion}
                          </p>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
