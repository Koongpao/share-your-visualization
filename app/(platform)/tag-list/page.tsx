import React from "react";
import { TagListDisplayTag } from "@/app/ui/small-components/DisplayTag";
import { IoLibrary } from "react-icons/io5";


export default function Page() {
  const libraryList = ["d3.js", "altair", "vega"];
  const tagList = [
    "bar",
    "line",
    "pie",
    "scatter",
    "map",
    "candlestick",
    "boxplot",
    "heatmap",
    "tree",
    "static",
    "interactive",
    "linear_regression",
    "geography",
    "business",
    "themed",
    "machine_learning"
  ];

  return (
    <div className="py-6 px-8 md:px-24 lg:px-36 lg:container xl:px-80 pb-12 flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center text-lg font-bold mb-6 border-b">
        <div className="text-gray-400">{libraryList.length + tagList.length}</div>
        <div>Tags</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {libraryList.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-2">
            <TagListDisplayTag key={i} label={tag} />
            <div className="text-white font-semibold bg-emerald-500 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-emerald-600 flex flex-row items-center gap-1">
            <IoLibrary className="text-xl" />Library
            </div>
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag}
            </div>
          </div>
        ))}
        {tagList.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-3">
            <TagListDisplayTag key={i} label={tag} />
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
