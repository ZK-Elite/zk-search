"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";

import { SkeletonForPage } from "@/src/components/Skeleton";
import NewsVideoCard from "@/src/components/news-video";
export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [result, setResult] = useState();

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (endpoint: any, options: any) => {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from server: ${response.statusText}`
      );
    }
    return await response.json();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const apiCalls = [
        fetchData("/api/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }),
      ];
      const [googleData] = await Promise.all(apiCalls);

      setResult(googleData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, query]);

  useEffect(() => {
    if (query) {
      loadData();
    }
  }, [loadData, query]);

  return (
    <>
      <div className="flex flex-col items-center md:space-auto space-y-2">
        <div className="bottom-0 w-full flex justify-center sm:mt-[10rem] mt-[13rem] flex-col xl:flex-row mb-[8.5rem] sm:px-9 px-5 gap-8">
          <div className="flex-auto w-full xl:w-7/12">
            <div className="p-4 content-group-right-first ">
              {loading ? (
                <SkeletonForPage />
              ) : (
                <>
                  <Carousel className="flex flex-wrap ">
                    <CarouselContent className="flex flex-wrap justify-start gap-y-4">
                      {result &&
                        result?.items.map((news, index) => {
                          return (
                            news.pagemap?.cse_image && (
                              <CarouselItem
                                className="md:basis-1/2 lg:basis-[20%] items-stretch  "
                                key={index}
                              >
                                <NewsVideoCard
                                  videoUrl={news.pagemap.cse_image[0].src}
                                  title={news.title}
                                  url={news.link}
                                  site="News"
                                />
                              </CarouselItem>
                            )
                          );
                        })}
                    </CarouselContent>
                  </Carousel>
                  <div className="w-full flex justify-center items-center mt-9">
                    <button className="flex flex-row items-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-36">
                      Load more
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
