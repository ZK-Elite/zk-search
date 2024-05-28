import { Skeleton } from "./ui/skeleton"
export const SkeletonForPage = () => {
    return (
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
    )
  }