'use client'
import React from "react";
import { TagListDisplayTag, TagListDisplayTagLanguage } from "@/app/ui/small-components/DisplayTag";
import { useState, useEffect } from "react";
import { fetchData } from "@/app/lib/controller";
import Loading from "./loading";

export default function Page() {
  const libraryList = [
    "d3.js",
    "altair",
    "vega",
    "apache_echarts",
    "chart.js",
    "seaborn",
    "recharts",
    "victory",
    "c3.js",
    "matplotlib",
    "bokeh",
    "highcharts",
    "plotly",
  ];
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
    "machine_learning",
  ];

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        setIsLoading(true)
        const data = await fetchData();
        console.log("test", data);
      } catch (error) {
        // Handle error, if needed
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchDataAndSetState();
  },[]);

  if (isLoading) return <Loading/>

  return (
    <div className="py-6 px-8 md:px-24 lg:px-36 xl:container xl:px-80 pb-12 flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center text-2xl font-bold mb-6 border-b">
        <div className="text-gray-400">{libraryList.length + tagList.length}</div>
        <div>Tags</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {libraryList.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-2" key={`library-${i}`}>
            <TagListDisplayTag label={tag} />
            <div className="text-white font-semibold bg-emerald-500 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-emerald-600 flex flex-row items-center gap-1">
              Library
            </div>
            {/* <TagListDisplayTagLanguage label={tag}/> */}
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag}
            </div>
          </div>
        ))}

        {tagList.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-3" key={`tag-${i}`}>
            <TagListDisplayTag label={tag} />
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
