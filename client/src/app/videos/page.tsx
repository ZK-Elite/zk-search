"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Tile from "@/src/components/ui/tile";
import { useSearchParams } from "next/navigation";
import VideoCard from "../../components/video";
import { Skeleton } from "../../components/ui/skeleton";
import { QueryTypes, VideoTypes } from "@/src/data/search-types";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [queryResult, setQueryResult] = useState<QueryTypes[]>();
  const [videoResult, setVideoResult] = useState<VideoTypes[]>();
  const [loading, setLoading] = useState(true);
  const [noOfresults, setnoOfResults] = useState(50);

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
        fetchData("/api/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keywords: query,
            result: 200,
          }),
        }),
      ];
      const [videoData] = await Promise.all(apiCalls);
      console.log(videoData);
      const validVideoData = videoData.data.filter(
        (data: any) => data.image_token
      );
      setVideoResult(validVideoData);
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
    const heights = videoRefs.current.map((ref) =>
      ref ? ref.offsetHeight : 0
    );
    const validHeights = heights.filter((height) => height > 0 && height < 300);
    setMaxHeight(Math.max(...validHeights));
  }, [videoResult]);

  const handleLoadMore = useCallback(() => {
    if (videoResult) {
      if (noOfresults + 10 <= videoResult.length) {
        setnoOfResults(noOfresults + 10);
      } else {
        setnoOfResults(videoResult.length);
      }
    }
  }, [videoResult, noOfresults, setnoOfResults]);
  return (
    <>
      <div className="flex flex-col items-center md:space-auto space-y-2 min-h-screen">
        <div className="bottom-0 w-full flex justify-center sm:mt-[10rem] mt-[13rem] flex-col xl:flex-row sm:mb-[8.5rem] mb-[2.5rem] sm:px-9 px-5 gap-8">
          <div className="w-full grid">
            <div className="p-4  rounded-2xl content-group-right-first ">
              {loading ? (
                <Tile>
                  {Array.from({ length: 8 }).map((_, index) => (
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
                    {videoResult &&
                      videoResult.slice(0, noOfresults).map((video, index) => {
                        return (
                          <div key={index}>
                            <div
                              ref={(el) => {
                                if (el) videoRefs.current[index] = el;
                              }}
                              style={{ height: maxHeight }}
                            >
                              <VideoCard
                                content={video.content}
                                description={video.description}
                                duration={video.duration}
                                src={
                                  video?.images?.large ?? video?.images?.medium
                                }
                                title={video.title}
                                publisher={video.publisher}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </Tile>

                  {videoResult && noOfresults < videoResult.length && (
                    <div className="w-full flex justify-center items-center mt-12">
                      <button
                        className="flex flex-row justify-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-5 w-[310px] max-sm:w-11/12 mt-2"
                        onClick={handleLoadMore}
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
