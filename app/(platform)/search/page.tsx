"use client";
import { SearchVisualization } from "@/app/lib/controller";
import { VisMinicard } from "@/app/ui/small-components/vis-minicard";
import { useEffect, useState, useRef, use } from "react";
import { useAtom } from "jotai";
import { atomSearchQuery, atomTagList, atomSearchDependency } from "@/app/atoms";
import Loading from "./loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GetAllTags } from "@/app/lib/controller";
import { Autocomplete, AutocompleteItem, Button, Pagination } from "@nextui-org/react";
import { TPagination, TVisualization, TVisualizationsArray, TlibraryAndTags } from "@/app/lib/definitions";
import { FaChevronLeft, FaChevronRight, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Link from "next/link";

export default function Page({}: {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const Params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagList, setTagList] = useAtom(atomTagList);
  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);
  // const [sortQuery, setSortQuery] = useState<TSortQuery>({
  //   sortby: "",
  //   order: ""
  // });

  const [sortQuery, setSortQuery] = useState<React.Key>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const [data, setData] = useState<TVisualizationsArray>([]);

  const [pagination, setPagination] = useState<TPagination>({
    currentPage: 1,
    totalPages: 1,
    startIndex: 0,
    endIndex: 0,
    totalDocuments: 0,
  });

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

  let searchParamSortBy = searchParams?.get("sortby") || "";

  let searchParamOrder = searchParams?.get("order") || "";
  if (searchParamSortBy !== "") {
    searchParamOrder = "desc";
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
    setSortQuery(searchParamSortBy);
    if (searchParamSortBy !== "") {
      setSortOrder("desc");
    }

    getVisualizationsData(
      searchParamSearchQuery,
      searchParamTags,
      searchParamPage,
      searchParamSortBy,
      searchParamOrder
    );
    // getVisualizationsData() but without states because useEffect does not set states on first render;
    if (Number(searchParams?.get("page")) < 1) {
      Params.set("page", "1");
      router.push(`/search?${Params.toString()}`);
    }
  };

  useEffect(() => {
    InitializePage();
  }, []);

  const getVisualizationsData = async (
    searchQuery: string,
    tagQuery: string[],
    page: string,
    sortby: string,
    order: string
  ) => {
    setIsLoading(true);
    const {
      data,
      message,
      success,
      pagination,
    }: { data: TVisualizationsArray; message: string; success: boolean; pagination: TPagination } =
      await SearchVisualization(searchQuery, tagQuery.join(","), page, sortby, order);
    setCardData(data);
    setSearchQuerySnapshot(searchQuery);
    setData(data);
    setPagination(pagination);
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
    if (sortQuery.toString() !== "") {
      Params.set("sortby", sortQuery.toString());
    }
    if (sortQuery.toString() !== "" && sortOrder === "") {
      Params.set("order", "desc");
    } else if (sortOrder !== "") {
      Params.set("order", sortOrder);
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

    if(sortQuery.toString() !== "" && sortOrder === ""){
      setSortOrder("desc");
    }

    getVisualizationsData(searchQuery, tagList, "1", sortQuery.toString(), sortOrder);
    //Resets current page to 1
  }, [tagList, searchDependency, sortQuery, sortOrder]);

  const handleNavigatePrevious = () => {
    Params.set("page", (pagination?.currentPage - 1).toString());
    setPagination({ ...pagination, currentPage: pagination?.currentPage - 1 });
    router.push(`/search?${Params.toString()}`);
  };

  const handleNavigateNext = () => {
    Params.set("page", (pagination?.currentPage + 1).toString());
    setPagination({ ...pagination, currentPage: pagination?.currentPage + 1 });
    router.push(`/search?${Params.toString()}`);
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getVisualizationsData(searchQuery, tagList, pagination.currentPage.toString(), sortQuery.toString(), sortOrder);
  }, [pagination.currentPage]);

  const sortByOptions = [
    { value: "date", label: "Date" },
    { value: "likes", label: "Likes" },
  ];

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
            Showing Results {pagination.startIndex} - {pagination.endIndex} of {pagination.totalDocuments} Results
          </div>
        </div>
        {data.length !== 0 && (
          <div className="flex justify-end items-center pt-2 gap-1">
            <Autocomplete
              label="Sort by"
              className="max-w-[7.5rem]"
              size="sm"
              variant={"bordered"}
              isClearable={false}
              //@ts-ignore
              selectedKey={sortQuery}
              onSelectionChange={setSortQuery}
            >
              {sortByOptions.map((option) => (
                <AutocompleteItem key={option.value} value={option.value}>
                  {option.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            {sortQuery.toString() !== "" && (
              <Button className="bg-transparent cursor-pointer min-w-3 max-w-[5rem] h-[48px] p-1.5 bg-white border-solid border-2 rounded-lg border-neutral-200">
                {sortOrder.toString() === "desc" ? (
                  <div className="flex flex-row items-center justify-center gap-1" onClick={() => setSortOrder("asc")}>
                    <FaSortAmountDown className="text-lg text-neutral-600" />
                    <div className="hidden md:flex text-neutral-500"> Desc.</div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-1" onClick={() => setSortOrder("desc")}>
                    <FaSortAmountUp className="text-lg text-neutral-600" />
                    <div className="hidden md:flex text-neutral-500"> Asc.</div>
                  </div>
                )}
              </Button>
            )}
          </div>
        )}
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
          {pagination.currentPage !== 1 ? (
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
          <div className="bg-slate-100 rounded-full p-2 hover:bg-slate-200 duration-200">{pagination.currentPage}</div>

          {pagination.currentPage < pagination.totalPages ? (
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
