"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Input,
  Button,
  Listbox,
  ListboxItem,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { getAllTags } from "../lib/controller";

import { SidebarTag, SidebarTagRm } from "./small-components/SidebarTag";
import { MiniDisplayTag, DisplayTag } from "./small-components/DisplayTag";

import { useAtom } from "jotai";
import { atomSidebarActive, atomTagList } from "../atoms";
import clsx from "clsx";

import { Inter } from "next/font/google";
import { RiProhibitedLine } from "react-icons/ri";
import { MdCategory, MdMiscellaneousServices } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";

const inter = Inter({ subsets: ["latin"] });

const staticLibraryList = [
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
const chartTypeList = ["bar", "line", "pie", "scatter", "map", "candlestick", "boxplot", "heatmap", "tree"];
const categoryList = ["static", "interactive"];
//This is for local defined for classifying tags in sidebar. For all global available tags, see tagList.ts

export default function VisSidebar() {
  const [activeTagList, setActiveTagList] = useAtom(atomTagList);
  const [showSidebar, setShowSidebar] = useAtom(atomSidebarActive);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const [availableTagList, setAvailableTagList] = useState<string[]>([]);

  const initializePage = async () => {
    try {
      const res = await getAllTags();
      //@ts-ignore
      const resTagList = (res.data.library.map((item) => item.name))
      //@ts-ignore
      const resLibraryList = (res.data.tags.map((item) => item.name))
      setAvailableTagList([...resTagList, ...resLibraryList])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    initializePage();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = availableTagList.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    setSearchResults(results);
  };

  const handleTagClick = (key: string) => {
    console.log(key);
    // Check if the tag is already in the list
    setSearchTerm("");
    setSearchResults([]);
    if (!availableTagList.includes(key)) {
      // If tag is not available, terminate the function
      console.log("Tag not found");
      return;
    }
    if (!activeTagList?.includes(key)) {
      // If not, add the label to the list
      setActiveTagList?.((prevTagList) => [...prevTagList, key]);
    } else {
      return;
    }
  };

  //Initial classes: -left-96 lg:left-0 lg:w-80
  return (
    <aside
      className={clsx(
        `p-6 h-[calc(100vh_-_4rem)] lg:h-[calc(100vh_-_5.5rem)] w-screen lg:w-80 lg:left-0 border-r border-l overflow-y-scroll bg-white z-20 fixed peer-focus:left-0 peer:transition ease-out delay-150 duration-200`,
        {"right-0" : showSidebar, "-right-[100vw]": !showSidebar}
      )}
    >
      {/* height for primary navbar = 4 rem
      height for secondary navbar = 1.5 rem */}
      {/* Ensure lg:w-80 lg:left-0 by placing them after showSidebarClass variable*/}
      <div className="flex flex-col justify-start item-center">
        <div className="pb-4 border-b w-full transition-all duration-300">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-x-2">
              <VscSettings className="text-3xl" />
              {showSidebar}
              <p className="text-base font-semibold">Applied Filters</p>
            </div>

            <div className="lg:hidden flex">
              <div className="bg-transparent p-0 w-fit cursor-pointer" onClick={() => setShowSidebar(false)}>
                <RxCross1 className="text-2xl text-slate-500" />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex flex-row flex-wrap gap-2">
              {activeTagList.map((eachTag, i) => (
                <SidebarTagRm label={eachTag} key={i} />
              ))}
            </div>
          </div>
          <div>
            {activeTagList.length > 0 && (
              <div
                className="text-red-500 font-semibold flex justify-center
                 bg-red-200 rounded-md py-2 my-2 cursor-pointer hover:bg-red-200/80 transition-colors delay-50"
                onClick={() => setActiveTagList([])}
              >
                <div className="flex flex-row gap-2 items-center">
                  <RiProhibitedLine className="text-2xl" />
                  Reset Filters
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 relative" onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)}>
          <Input
            type="text"
            placeholder="Search for Tags..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTagClick(searchResults[0] || "");
              }
            }}
          />
          {isInputFocused && searchResults.length > 0 && (
            <Listbox
              aria-label="Actions"
              //@ts-ignore
              onAction={handleTagClick}
              className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
            >
              {searchResults.map((result, index) => (
                <ListboxItem key={result}>
                  <DisplayTag label={result} />
                  {/* <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300 w-fit">
                    {result}
                  </div> */}
                </ListboxItem>
              ))}
            </Listbox>
          )}
          {isInputFocused && searchTerm.trim() !== "" && searchResults.length === 0 && (
            <Listbox
              disabledKeys={["noresult"]}
              aria-label="Actions"
              className="absolute z-10 bg-white border rounded-md mt-1 p-1 w-full"
            >
              <ListboxItem key="noresult">No results found.</ListboxItem>
            </Listbox>
          )}
        </div>

        <div className="my-4 border-b pb-4">
          <Accordion
            selectionMode="multiple"
            className={`font-medium ${inter.className}`}
            itemClasses={{
              title: "text-sm font-semibold",
            }}
            defaultExpandedKeys={["1", "2", "3", "4"]}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Library"
              startContent={<IoLibrary className="text-xl" />}
            >
              <div className="flex flex-row flex-wrap gap-2">
                {staticLibraryList.map((eachTag, i) => (
                  <SidebarTag key={i} label={eachTag} />
                ))}
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Chart Type"
              startContent={<FaChartPie className="text-xl" />}
            >
              <div className="flex flex-row flex-wrap gap-2">
                {chartTypeList.map((eachTag, i) => (
                  <SidebarTag key={i} label={eachTag} />
                ))}
              </div>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="Category"
              startContent={<MdCategory className="text-2xl" />}
            >
              <div className="flex flex-row flex-wrap gap-2">
                {categoryList.map((eachTag, i) => (
                  <SidebarTag key={i} label={eachTag} />
                ))}
              </div>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="Miscellaneous"
              startContent={<MdMiscellaneousServices className="text-2xl" />}
            ></AccordionItem>
          </Accordion>
        </div>
      </div>
    </aside>
  );
}
