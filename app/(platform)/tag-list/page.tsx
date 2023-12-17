"use client";
import { TagListDisplayTag, TagListDisplayTagLanguage } from "@/app/ui/small-components/DisplayTag";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { getAllTags } from "@/app/lib/controller";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tagList, setTagList] = useState<string[]>([]);
  const [libraryList, setLibraryList] = useState<string[]>([]);

  const initializePage = async () => {
    try {
      setIsLoading(true);
      const res = await getAllTags();
      //@ts-ignore
      setLibraryList(res.data.library.filter((item) => item.status == "approved").map((item) => item.name));
      //@ts-ignore
      setTagList(res.data.tags.filter((item) => item.status == "approved").map((item) => item.name));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePage();
  }, []);

  if (isLoading) return <Loading />;

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
