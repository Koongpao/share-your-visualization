import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="container py-6 px-8 md:px-24 lg:px-48 pb-12">
      <div className="flex flex-col gap-4">
        <Skeleton className="rounded-lg w-4/5 h-[1.5rem]" />
        <div className="flex flex-row  gap-2 items-center w-full">
          <Skeleton className="rounded-full h-[2.5rem] w-[2.5rem]" />
          <Skeleton className="rounded-lg w-3/5 h-[1.5rem]" />
        </div>
        <Skeleton className="rounded-lg w-3/5 h-[1.5rem]" />
        <Skeleton className="flex lg:hidden rounded-lg w-3/5 h-[1.5rem]" />
      </div>
      <div className="flex flex-col gap-6 pt-10">
        <Skeleton className="rounded-lg w-5/5 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-11/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-11/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-11/12 h-[1.5rem]" />
        <Skeleton className="rounded-lg w-3/5 h-[1.5rem]" />
      </div>
      <div className="py-10">
        <Skeleton className="rounded-lg h-[40vh] w-full" />
      </div>
    </div>
  );
}
