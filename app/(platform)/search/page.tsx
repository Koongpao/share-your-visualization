"use client";
import { SearchVisualization } from "@/app/lib/controller";
import { VisMinicard } from "@/app/ui/small-components/vis-minicard";
import { useEffect, useState, useRef, use } from "react";
import { useAtom } from "jotai";
import { atomSearchQuery, atomTagList, atomSearchDependency } from "@/app/atoms";
import Loading from "./loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetAllTags } from "@/app/lib/controller";
import { Pagination } from "@nextui-org/react";
import { TPagination, TVisualization, TVisualizationsArray, TlibraryAndTags } from "@/app/lib/definitions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Page({}: {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const Params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagList, setTagList] = useAtom(atomTagList);
  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);

  const [data, setData] = useState<TVisualizationsArray>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(0);
  const [totalDocuments, setTotalDocuments] = useState<number>(0);

  const [cardData, setCardData] = useState<TVisualizationsArray>();

  const [searchDependency, setSearchDependency] = useAtom(atomSearchDependency);

  const [searchQuerySnapshot, setSearchQuerySnapshot] = useState<string>("");

  let searchParamTags = searchParams?.get("tags")?.split(",") || [];
  //Extract Tags from Search Params
  searchParamTags = searchParamTags.filter((item, pos) => {
    return searchParamTags.indexOf(item) === pos;
  });
  //Prevent duplicate tags

  let searchParamSearchQuery = searchParams?.get("search_query") || "";
  //Extract Search Query from Search Params
  let searchParamPage = "";
  if (Number(searchParams?.get("page")) < 1) {
    searchParamPage = "1";
  } else {
    searchParamPage = searchParams?.get("page") || "1";
  }

  const InitializePage = async () => {
    const {
      data,
      message,
      success,
      totalPages,
    }: { data: TlibraryAndTags; message: string; success: boolean; totalPages: number } = await GetAllTags();
    const resTagList = data.library.filter((item) => item.status == "approved").map((item) => item.name);
    const resLibraryList = data.tags.filter((item) => item.status == "approved").map((item) => item.name);
    const availableTagList = [...resTagList, ...resLibraryList];
    //Get Available Tags from server

    setTagList([]);
    searchParamTags?.forEach((eachTag) => {
      if (!availableTagList.includes(eachTag)) {
        // Check validity of tags
        return;
      }
      if (!tagList?.includes(eachTag)) {
        // Check if the tag is already in the list
        setTagList((prevTagList) => [...prevTagList, eachTag]);
      }
    });
    //SetTagList with Tags from Search Params

    setSearchQuery(searchParamSearchQuery);
    //SetSearchQuery with Search Query from Search Params
    getVisualizationsData(searchParamSearchQuery, searchParamTags, searchParamPage);
    // getVisualizationsData() but without states because useEffect does not set states on first render;
    if (Number(searchParams?.get("page")) < 1) {
      Params.set("page", "1");
      router.push(`/search?${Params.toString()}`);
    }
  };

  useEffect(() => {
    InitializePage();
  }, []);

  const getVisualizationsData = async (searchQuery: string, tagQuery: string[], page: string) => {
    setIsLoading(true);
    const {
      data,
      message,
      success,
      pagination
    }: { data: TVisualizationsArray; message: string; success: boolean; pagination: TPagination } =
      await SearchVisualization(searchQuery, tagQuery.join(","), page);
    setCardData(data);
    setSearchQuerySnapshot(searchQuery);
    setData(data);
    setTotalPages(pagination.totalPages);
    setCurrentPage(parseInt(page));
    setStartIndex(pagination.startIndex);
    setEndIndex(pagination.endIndex);
    setTotalDocuments(pagination.totalDocuments);
    setIsLoading(false);
  };

  const updateURLOnParamsChange = () => {
    if (tagList.length !== 0) {
      Params.set("tags", tagList.join(","));
    } else {
      Params.delete("tags");
    }
    if (searchQuery !== "") {
      Params.set("search_query", searchQuery);
    } else {
      Params.delete("search_query");
    }
    Params.set("page", "1");
    router.push(`/search?${Params.toString()}`);
  };

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current <= 2) {
      return;
    }
    //Prevent useEffect from running on first 2 renders
    //First render is initial page load, second render is from tagList change from InitializePage(), because tagList is in dependency array

    //useEffect with dependencies must be used because router.push() does not trigger a page refresh when on the same page
    //called everytime tagList is changed from VisSidebar or searchDependency is called by search button in VisNavbar
    updateURLOnParamsChange();
    getVisualizationsData(searchQuery, tagList, "1");
    //Resets current page to 1
  }, [tagList, searchDependency]);

  const handleNavigatePrevious = () => {
    Params.set("page", (currentPage - 1).toString());
    setCurrentPage(currentPage - 1);
    router.push(`/search?${Params.toString()}`);
  };

  const handleNavigateNext = () => {
    Params.set("page", (currentPage + 1).toString());
    setCurrentPage(currentPage + 1);
    router.push(`/search?${Params.toString()}`);
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getVisualizationsData(searchQuery, tagList, currentPage.toString());
  }, [currentPage]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-6">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="w-full border-b py-2">
          {searchQuerySnapshot && (
            <div className="text-lg font-medium text-slate-600">
              Showing Results for <span className="font-bold text-slate-800">{searchQuerySnapshot}</span>
            </div>
          )}
          <div className="text-lg font-medium text-slate-600">
              {/* Showing Results {(currentPage - 1) * 12 + 1} - {(currentPage) * 12 - (12 - data.length)}  */}
              Showing Results {startIndex} - {endIndex} of {totalDocuments} Results
          </div>
        </div>
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-start">
          {cardData?.map((eachCard: TVisualization, i: number) => (
            <VisMinicard key={i} cardInfo={eachCard} />
          ))}
          {cardData?.length === 0 && (
            <div className="flex flex-col justify-start gap-y-2">
              <div className="text-2xl font-semibold text-slate-600">No Results Found.</div>
              <div className="text-md font-medium text-slate-400">Try something else.</div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-1 items-center justify-center text-xl">
          {currentPage !== 1 ? (
            <div
              onClick={() => handleNavigatePrevious()}
              className="cursor-pointer bg-slate-100 rounded-full p-2 hover:bg-slate-200 duration-200"
            >
              <FaChevronLeft />
            </div>
          ) : (
            <div className="bg-slate-100 rounded-full p-2 opacity-0">
              <FaChevronLeft />
            </div>
          )}
          <div className="bg-slate-100 rounded-full p-2 hover:bg-slate-200 duration-200">{currentPage}</div>

          {currentPage < totalPages ? (
            <div
              onClick={() => handleNavigateNext()}
              className="cursor-pointer bg-slate-100 rounded-full p-2 hover:bg-slate-200 duration-200"
            >
              <FaChevronRight />
            </div>
          ) : (
            <div className="bg-slate-100 rounded-full p-2 opacity-0">
              <FaChevronRight />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
