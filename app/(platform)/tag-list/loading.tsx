import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="py-6 px-8 md:px-24 lg:px-36 xl:container xl:px-80 pb-12 flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <Skeleton className="rounded-lg w-4/5 h-[1.5rem]" />
        <div className="flex flex-row  gap-2 items-center w-full">
          <Skeleton className="rounded-full h-[2.5rem] w-[2.5rem]" />
          <Skeleton className="rounded-lg w-3/5 h-[1.5rem]" />
        </div>
        <Skeleton className="rounded-lg w-3/5 h-[1.5rem]" />
        <Skeleton className="flex lg:hidden rounded-lg w-3/5 h-[1.5rem]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-10/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-10/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-7/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-7/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-10/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-10/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-9/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-7/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-8/12 h-[1.5rem]" />
      </div>
    </div>
  );
}
