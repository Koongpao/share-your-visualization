"use client";
import { SearchVisualization } from "@/app/lib/controller";
import { VisMinicard } from "@/app/ui/small-components/VisMinicard";
import { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { atomSearchQuery, atomTagList, atomSearchDependency } from "@/app/atoms";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { GetAllTags } from "@/app/lib/controller";
import { TVisualization, TVisualizationsArray, TlibraryAndTags } from "@/app/lib/definitions";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    search_query?: string;
    tags?: string;
  };
}) {
  const router = useRouter();
  const Params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagList, setTagList] = useAtom(atomTagList);
  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);

  const [cardData, setCardData] = useState<TVisualizationsArray>();

  const [searchDependency, setSearchDependency] = useAtom(atomSearchDependency);

  const [searchQuerySnapshot, setSearchQuerySnapshot] = useState<string>("");

  const InitializePage = async () => {
    const { data, message, success }: { data: TlibraryAndTags; message: string; success: boolean } = await GetAllTags();
    const resTagList = data.library.filter((item) => item.status == "approved").map((item) => item.name);
    const resLibraryList = data.tags.filter((item) => item.status == "approved").map((item) => item.name);

    const availableTagList = [...resTagList, ...resLibraryList];
    //Get Available Tags from server

    let searchParamTags = Params.get("tags")?.split(",") || [];
    //Extract Tags from Search Params

    searchParamTags = searchParamTags.filter((item, pos) => {
      return searchParamTags.indexOf(item) === pos;
    });
    //Prevent duplicate tags

    searchParamTags?.forEach((eachTag) => {
      if (!availableTagList.includes(eachTag)) {
        // If tag is not available, terminate the loop
        return;
      }
      if (!tagList?.includes(eachTag)) {
        // Check if the tag is already in the list
        setTagList((prevTagList) => [...prevTagList, eachTag]);
      }
    });
    //SetTagList with Tags from Search Params

    let searchParamSearchQuery = Params.get("search_query") || "";
    setSearchQuery(searchParamSearchQuery);
    //SetSearchQuery with Search Query from Search Params

    const {
      data: InitialData,
      message: InitialMessage,
      success: InitialSuccess,
    }: { data: TVisualizationsArray; message: string; success: boolean } = await SearchVisualization(searchParamSearchQuery, searchParamTags.join(","));
    setCardData(InitialData);
    setSearchQuerySnapshot(searchParamSearchQuery);
    setIsLoading(false);
    // getVisualizationsData() but without states because useEffect does not set states on first render;
  };

  useEffect(() => {
    InitializePage();
  }, []);

  const getVisualizationsData = async () => {
    setIsLoading(true);
    const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
      await SearchVisualization(searchQuery, tagList.join(","));
    setCardData(data);
    setSearchQuerySnapshot(searchQuery);
    setIsLoading(false);
  };

  const updateURLOnTagChange = () => {
    Params.set("tags", tagList.join(","));
    Params.set("search_query", searchQuery);
    router.push(`/search?${Params.toString()}`);
  };

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    //Prevent useEffect from running on first render
    //called everytime tagList is changed from VisSidebar or searchDependency is called by button in input in VisNavbar
    updateURLOnTagChange();
    getVisualizationsData();
  }, [tagList, searchDependency]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-6">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="w-full border-b py-2">
          {searchQuerySnapshot && <div className="text-lg font-medium text-slate-600">
            Showing Results for <span className="font-bold text-slate-800">{searchQuerySnapshot}</span>
          </div>}
        </div>
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-start">
          {cardData?.map((eachCard: TVisualization, i: number) => (
            <VisMinicard key={i} cardInfo={eachCard} />
          ))}
        </div>
      </div>
    </div>
  );
}
