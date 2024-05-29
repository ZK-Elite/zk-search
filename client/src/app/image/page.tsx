"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../../components/ui/skeleton";
import { ImageTypes } from "@/src/data/search-types";
import { Gallery } from "./Gallery";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [imageResult, setImageResult] = useState<ImageTypes[]>();
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

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

      fetchData("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keywords: query,
          result: 50
        }),
      }).then((imageData) => {
        console.log(imageData.data)

        setImageResult(imageData.data)
      }).catch((err) => {
        console.log("error")
      });

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
      <div className={`flex flex-col items-center md:space-auto space-y-2 ${(!loading && imageResult) ? 'h-auto' : 'h-screen'}`}>
        <div className="bottom-0 w-full flex justify-center sm:mt-[10rem] mt-[13rem] flex-col xl:flex-row sm:mb-[8.5rem] mb-[2.5rem] sm:px-9 px-5 gap-8">

          <div className="flex-auto w-full xl:w-5/12">
            {imageResult && (
              <div>
                {loading ? (
                  <div className="flex flex-row justify-around">
                    <Skeleton className="h-[15vh] w-[10vw]" />
                    <Skeleton className="h-[15vh] w-[10vw]" />
                    <Skeleton className="h-[15vh] w-[10vw]" />
                  </div>
                ) : (
                  <>
                    <div>
                      <Gallery images={
                        (loadMore ? imageResult : imageResult.slice(0,25)).map(image => {
                          return {
                            src: image.image,
                            width: image.width,
                            height: image.height,
                            alt: image.title,
                            title: image.title,
                            url: image.url
                          }
                        })
                      } margin={7} />
                      {!loadMore && <div className="w-full flex justify-center items-center mt-3">
                        <button className="flex flex-row justify-center gap-2 bg-[#20292d] dark:bg-[#d3e8eb] text-white dark:text-black rounded-full py-3 px-5 w-[310px] max-sm:w-11/12"
                          onClick={() => setLoadMore(true)}
                        >
                          Load More
                        </button>
                      </div>}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  );
}
