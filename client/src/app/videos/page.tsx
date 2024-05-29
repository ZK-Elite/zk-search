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

      const apiCalls = [
        fetchData("/api/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
            result: 20
          }),
        }),
      ];
      const [videoData] = await Promise.all(apiCalls);
      setVideoResult(videoData.data);
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
    const heights = videoRefs.current.map(ref => ref ? ref.offsetHeight : 0);
    const validHeights = heights.filter(height => height > 0 && height < 300)
    setMaxHeight(Math.max(...validHeights));
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
                            <div key={index}>
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
                            </div>
                          )
                        );
                      })}
                    </Tile>
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
