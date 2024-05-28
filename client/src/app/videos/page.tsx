"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "../../components/ui/carousel"
import Tile from "@/src/components/ui/tile";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Summary from "../../components/summary";
import RelevantLinks from "../../components/relevantlinks";
import RelatedLink from "../../components/relatedlink";
import VideoCard from "../../components/video";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Skeleton } from "../../components/ui/skeleton";
import AdsCard from "../../components/AdsCard";
import { Adtype } from "../../data/types";
import NewsCard from "@/src/components/news";
import logoImg from "../../../public/logo.svg";
import ImageCard from "@/src/components/image";
import { ImageTypes, NewsTypes, QueryTypes, VideoTypes } from "@/src/data/search-types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [queryResult, setQueryResult] = useState<QueryTypes[]>();
  const [suggest, setSuggest] = useState<string[]>();
  const [imageResult, setImageResult] = useState<ImageTypes[]>();
  const [videoResult, setVideoResult] = useState<VideoTypes[]>();
  const [newsResult, setNewsResult] = useState<NewsTypes[]>();
  const [veniceUrlResult, setVeniceUrlResult] = useState<[]>();
  const [summaryResult, setSummaryResult] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const [ad, setAd] = useState<Adtype[]>([]);

  const fetchData = useCallback(async (endpoint: any, options: any) => {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from server: ${response.statusText}`);
    }
    return await response.json();
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {

      setPending(true);

      fetchData("/api/venice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then((venisData) => {
        setPending(false);
        setSummaryResult(venisData.data)
      }).catch((err) => {
        console.error("Error fetching Venice data")
      });

      const apiCalls = [
        fetchData("/api/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
          }),
        }),
        fetchData("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        }),
        fetchData("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
            max_results: 11
          }),
        }),
        fetchData("/api/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
          }),
        }),
        fetchData("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
          }),
        }),
        fetchData("/api/ads/fetch", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ];

      const [queryData, suggestionData, imageData, videoData, newsData, adData] = await Promise.all(apiCalls);

      const hrefArray = queryData.data?.map((item: any) => item.href);
      setVeniceUrlResult(hrefArray);
      setQueryResult(queryData.data);
      setSuggest(suggestionData.data);
      setImageResult(imageData.data);
      setVideoResult(videoData.data);
      setNewsResult(newsData.data);
      setAd(adData);
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

  const videoRefs = useRef<HTMLDivElement[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);
  useEffect(() => {
    // Calculate the maximum height after all components are rendered
    const heights = videoRefs.current.map(ref => ref ? ref.offsetHeight : 0);
    setMaxHeight(Math.max(...heights));
  }, [videoResult]);
  
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

                  {/* ---------------- video ---------------- */}

                  <div className="mt-8">
                    <p className="mb-4 text-xl text-white dark:text-black font-bold leading-6">Videos</p>
                    <Tile>
                      {videoResult && videoResult.map((video, index) => {
                        return (
                          video.image_token && (
                            <>
                              <div
                                ref={el => {
                                  if (el) videoRefs.current[index] = el;
                                }}
                                style={{ height: maxHeight }}
                              >
                                <VideoCard
                                  content={video.content}
                                  description={video.description}
                                  duration={video.duration}
                                  src={video.images.large}
                                  title={video.title}
                                />
                              </div>
                            </>
                          )
                        );
                      })}
                    </Tile>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex-auto w-full xl:w-5/12">
            <span className="absolute right-20 mt-[-12px] z-30 text-white dark:text-black py-[2px] px-[10px] border border-white dark:border-[#27272a] rounded-[21px] text-[10px] bg-[#222729] dark:bg-[#fff] font-bold">Ad</span>
            <div className="dark:bg-[#d3e8eba1] bg-[#121e22] mb-4 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden relative">
              {loading ? (
                <div className="justify-around">
                  <Skeleton className="w-full h-[13vh] rounded-3xl" />
                </div>
              ) : (
                <>
                  {ad?.length > 0 && (
                    <div className="flex w-full h-full">
                      <AdsCard
                        imgUrl={ad[0].image}
                        title={ad[0].title}
                        url={ad[0].url}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="dark:bg-[#d3e8eba1] bg-[#121e22] mb-4 rounded-2xl content-group-right1 overflow-hidden">
              {pending ? (
                <div className="flex items-center justify-between py-6 px-4 min-w-screen">
                  <div className="w-2/12">
                    <Image
                      width={30}
                      height={30}
                      src={logoImg}
                      alt="LOGO"
                      priority
                    />
                  </div>
                  <div className="w-10/12 flex items-center justify-center space-x-3">
                    {[...Array(12)].map((_, i) => (
                      <span
                        key={i}
                        className={`dot bg-[#38E5FF] rounded-full w-2.5 h-2.5`}
                        style={{
                          animation: `dot-carousel-loader 1s linear infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {summaryResult && queryResult && (
                    <Summary
                      description={summaryResult}
                      urls={veniceUrlResult ?? []}
                    />
                  )}
                </>
              )
              }
            </div>
            {imageResult && (
              <div
                className="dark:bg-[#d3e8eba1] bg-[#121e22] max-md:pr-9 mb-4 mt-0 max-md:mt-3 rounded-2xl p-4 content-group-right-first content-group-right1 overflow-hidden "
              >
                <p className="mt-2 mb-4 text-xl text-white dark:text-black font-bold leading-6">Images</p>
                <div className="content-group-video max-md:p-2">
                  {loading ? (
                    <div className="flex flex-row justify-around">
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
                      <Skeleton className="h-[15vh] w-[10vw]" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="grid grid-cols-5 gap-2">
                          {imageResult.slice(0, 11).map((image, index) => {
                            return (
                              image.image && (
                                <ImageCard
                                  key={index}
                                  imageUrl={image.image}
                                  url={image.url}
                                />
                              )
                            );
                          })}
                        </div>
                        <div className="w-full flex justify-center items-center mt-3">
                          <button className="flex flex-row items-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-5">
                            More Images
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            <ScrollArea
              className="dark:bg-[#d3e8eba1] bg-[#121e22] rounded-2xl p-4 pr-0 content-group-right-first content-group-right2 overflow-hidden flex justify-center"
            >
              {loading ? (
                <div className="flex flex-row justify-around">
                  <Skeleton className="h-[5vh] w-[10vw]" />
                  <Skeleton className="h-[5vh] w-[10vw]" />
                  <Skeleton className="h-[5vh] w-[10vw]" />
                </div>
              ) : (
                <>
                  {suggest &&
                    suggest.map((sug, index) => (
                      <RelatedLink
                        key={index}
                        link={"/search?q=" + sug}
                        query={sug}
                      />
                    ))}
                </>
              )}
            </ScrollArea>
          </div>
        </div>
      </div >
    </>
  );
}
