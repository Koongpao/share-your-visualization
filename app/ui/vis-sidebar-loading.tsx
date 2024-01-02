import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function VisSidebarLoading() {
  return (
    <aside
      className={
        "p-6 h-[calc(100vh_-_4rem)] lg:h-[calc(100vh_-_5.5rem)] w-screen lg:w-80 lg:left-0 border-r border-l overflow-y-scroll bg-white z-20 fixed peer-focus:left-0 peer:transition ease-out delay-150 duration-200 -right-[100vw] lg:right-0"
      }
    >
      <Skeleton className="w-3/4 h-[2rem] rounded-full"></Skeleton>
      <div className="flex flex-row py-2 gap-x-2">
        <Skeleton className="w-1/4 h-[2rem] rounded-full"></Skeleton>
        <Skeleton className="w-1/4 h-[2rem] rounded-full"></Skeleton>
        <Skeleton className="w-2/4 h-[2rem] rounded-full"></Skeleton>
      </div>
      <div className="border-b mt-2 mb-5"></div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-3/4 h-[2.5rem] rounded-full"></Skeleton>
        <Skeleton className="w-full h-[2rem] rounded-full"></Skeleton>
        <div className="flex flex-row flex-wrap gap-2">
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-5/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-6/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
        </div>
        <Skeleton className="w-full h-[2rem] rounded-full mt-6"></Skeleton>
        <div className="flex flex-row flex-wrap gap-2">
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-5/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
        </div>
        <Skeleton className="w-full h-[2rem] rounded-full mt-6"></Skeleton>
        <div className="flex flex-row flex-wrap gap-2">
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-5/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-3/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-4/12 h-[2rem] rounded-full"></Skeleton>
          <Skeleton className="w-5/12 h-[2rem] rounded-full"></Skeleton>
        </div>
      </div>
    </aside>
  );
}
