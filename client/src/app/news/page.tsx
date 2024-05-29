"use client";

import React, { useCallback, useEffect, useState } from "react";

import Tile from "@/src/components/ui/tile";

import { useSearchParams } from "next/navigation";

import { Skeleton } from "../../components/ui/skeleton";

import { Adtype } from "../../data/types";
import NewsCard from "@/src/components/news";

import { NewsTypes, QueryTypes } from "@/src/data/search-types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [queryResult, setQueryResult] = useState<QueryTypes[]>();
 
  const [newsResult, setNewsResult] = useState<NewsTypes[]>();

  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const [ad, setAd] = useState<Adtype[]>([]);
  const [noOfresults, setnoOfResults] = useState(Number); // Flag to check if more items are available
  const fetchData = useCallback(async (endpoint: any, options: any) => {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from server: ${response.statusText}`);
    }
    return await response.json();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setnoOfResults(20);
    try {
      
      setPending(true);

      const apiCalls = [
        fetchData("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
            result:noOfresults,
          }),
        }),
      ];
      const [newsData] = await Promise.all(apiCalls);
      setNewsResult(newsData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchData, query,noOfresults]);

  useEffect(() => {
    if (query) {
      loadData();
    }
  }, [loadData, query]);

 
  const handleLoadMore = () => {
    if (noOfresults + 10 <= 40) {  // Ensure not exceeding 40 results
      setnoOfResults(noOfresults + 10);
    } else {
      setnoOfResults(40); // Set to max if adding 10 would exceed 40
    }
  };
  return (
    <>
      <div className={`flex flex-col items-center md:space-auto space-y-2 ${loading && !queryResult ? 'h-screen' : ''}`}>
        <div className="bottom-0 w-full flex justify-center sm:mt-[10rem] mt-[13rem] flex-col xl:flex-row mb-[8.5rem] sm:px-9 px-5 gap-8">
          <div className="flex-auto w-full xl:w-7/12">
            <div className="p-4 dark:bg-[#d3e8eba1] bg-[#121e22] rounded-2xl content-group-right-first ">
              {loading ? (
                <div className="dark:bg-[#d3e8eba1] bg-[#121e22] flex flex-col gap-8 rounded-2xl p-4">
                  <Skeleton className="h-7 w-32 rounded-full" />
                  <div className="flex flex-col gap-6">
                    <Skeleton className="h-5 w-[38vw] rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-5 w-[45vw] rounded-full" />
                      <Skeleton className="h-5 w-[48vw] rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Skeleton className="h-5 w-[38vw] rounded-full" />
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-5 w-[45vw] rounded-full" />
                      <Skeleton className="h-5 w-[48vw] rounded-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <>

               

                  <div className="mt-8">
                    <p className="mb-4 text-xl text-white dark:text-black font-bold leading-6">news</p>
                    <Tile>
                    {newsResult &&
                        newsResult.map((news, index) => {
                          return (
                            news.title && (
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
                            )
                          );
                        })}
                    </Tile>
                  </div>
                  <div className="w-full flex justify-center items-center mt-9">
                    <button
                      onClick={handleLoadMore}
                      className="flex flex-row items-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-36"
                    >
                      Load More
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
