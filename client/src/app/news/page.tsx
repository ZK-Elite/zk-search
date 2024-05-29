"use client";

import React, { useCallback, useEffect, useState } from "react";
import Tile from "@/src/components/ui/tile";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../../components/ui/skeleton";
import NewsCard from "@/src/components/news";
import { useRouter } from "next/navigation";
import { NewsTypes } from "@/src/data/search-types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [newsResult, setNewsResult] = useState<NewsTypes[]>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const [noOfresults, setnoOfResults] = useState(50); // Flag to check if more items are available
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
        fetchData("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
            result: 200,
          }),
        }),
      ];
      const [newsData] = await Promise.all(apiCalls);
      const validNewsData = newsData.data.filter((data: any) => data.title && data.url);
      setNewsResult(validNewsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, query, setNewsResult]);

  useEffect(() => {
    if (!query) router.push("/");

    loadData();
  }, [loadData, query, router]);

  const handleLoadMore = useCallback(() => {
    if(newsResult) {
      if (noOfresults + 10 <= newsResult.length) {
        setnoOfResults(noOfresults + 10);
      } else {
        setnoOfResults(newsResult.length);
      }
    }
  }, [newsResult, noOfresults, setnoOfResults]);
  return (
    <>
      <div className="flex flex-col items-center md:space-auto space-y-2 min-h-screen">
        <div className="bottom-0 w-full flex justify-center sm:mt-[10rem] mt-[13rem] flex-col xl:flex-row sm:mb-[8.5rem] mb-[2.5rem] sm:px-9 px-5 gap-8">
          <div className="flex-auto w-full xl:w-7/12">
            <div className="p-4 rounded-2xl content-group-right-first ">
              {loading ? (
                <Tile>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-[#121e22] dark:bg-[#d3e8eba1] flex flex-col gap-4 rounded-2xl p-4"
                    >
                      <Skeleton className="w-full aspect-video" />
                      <div className="flex flex-col gap-4">
                        <Skeleton className="w-full h-2" />
                        <Skeleton className="w-full h-2" />
                      </div>
                    </div>
                  ))}
                </Tile>
              ) : (
                <>
                  <Tile>
                    {newsResult &&
                      newsResult.slice(0, noOfresults).map((news, index) => {
                        return (
                            <div
                              className="md:basis-1/2 lg:basis-[19%] items-center"
                              key={index}
                            >
                              <NewsCard
                                newsUrl={news.url}
                                title={news.title}
                                image={news.image}
                                date={news.date}
                                source={news.source}
                              />
                            </div>
                        );
                      })}
                  </Tile>

                  { (newsResult && noOfresults < newsResult.length) && <div className="w-full flex justify-center items-center mt-10">
                    <button className="flex flex-row justify-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-5 w-[310px] max-sm:w-11/12"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
