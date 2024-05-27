"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation"; // Corrected import path
import { Input } from "./ui/input";
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
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<SuggestTypes[]>([]);
  // search function
  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value || "";
    if (!term.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };
  // handle input change function

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== "") {
      setOpen(true)
      fetchSuggestions(newQuery);
    } else {
      setOpen(false);
      setSuggestions([]);
    }
  };

  // handle click outside function

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef]);

  // fetch suggestions
  const fetchSuggestions = async (input: string) => {
    try {
      const response = await fetch(`/api/suggest?q=${input}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data) {
        setSuggestions(data.data.slice(0, 4));
      }
    } catch (error) {
      console.error(`Error fetching suggestions: ${error}`);
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
      <>
        <div
          className={cn(
            `flex flex-col justify-center w-full items-center rounded-[14px] bg-[#121e22e0] px-5 py-1 md:w-[552px] ${pathname === "/" ? "border-2 border-[#38E5FF] dark:bg-[#cbf8ffbd]" : "border border-[#27272A] dark:bg-[#d3e8eb] "}`)}
        >
          <div
            className="flex flex-col justify-center items-center w-full"
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
          >
            <form
              onSubmit={search}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className='flex justify-center items-center w-full'>
                <Image
                  width={22}
                  height={22}
                  src='images/icons/search-normal.svg'
                  alt='Search Icon'
                  className='h-5 w-5 text-gray-500 mr-3'
                />
                <Input
                  ref={searchInputRef}
                  value={query}
                  onChange={handleInputChange}
                  type='search'
                  placeholder='What are you looking for?'
                  className='text-white dark:text-black text-base mb-8 m-auto bg-transparent focus:outline-none focus:border-none border-none focus:ring-none hover:bg-transparent outline-none'
                />
              </div>
              {open &&
                <div className="flex flex-col top-full left-0 right-0 rounded-lg w-full">
                  {
                    suggestions?.length > 0 &&
                    <div className="h-[1px] bg-[#27272A] mt-1"></div>
                  }
                  {
                    <div className={`flex gap-3 flex-col ${suggestions?.length > 0 && "py-4"}`}>
                      {
                        suggestions?.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion.phrase)}
                            className='pl-3 py-2 cursor-pointer hover:bg-[#FFFFFF12] flex flex-row items-center justify-start rounded-md'
                          >
                            <Image
                              width={15}
                              height={15}
                              src='images/icons/search-normal.svg'
                              alt='Search Icon'
                              className='h-3.5 w-3.5 text-gray-500 mr-3'
                            />
                            <p className="text-white dark:text-black text-sm font-medium">
                              {suggestion.phrase}
                            </p>
                          </div>
                        ))}
                    </div>
                  }
                </div>
              }
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default SearchBox;
