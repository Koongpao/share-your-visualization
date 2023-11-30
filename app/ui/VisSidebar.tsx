"use client";
import { useState } from "react";
import { MdCategory, MdMiscellaneousServices } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { Accordion, AccordionItem, Input } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { IoLibrary } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { SidebarTag, SidebarTagRm } from "./small-components/SidebarTag";
import { RiProhibitedLine } from "react-icons/ri";
import { useAtom } from "jotai";
import { atomSidebarActive, atomTagList } from "../atoms";

const inter = Inter({ subsets: ["latin"] });

export default function VisSidebar() {
  // const [activeTagList, setActiveTagList] = useState<string[]>([]);
  const [activeTagList, setActiveTagList] = useAtom(atomTagList);
  const [showSidebar, setShowSidebar] = useAtom(atomSidebarActive);

  const showSidebarClass = showSidebar ? "right-0" : "-right-96";

  const libraryList = ["d3.js", "altair", "vega"];
  const chartTypeList = [
    "bar",
    "line",
    "pie",
    "scatter",
    "map",
    "candlestick",
    "boxplot",
    "heatmap",
    "tree",
  ];
  const categoryList = ["static", "interactive"];

  //Initial classes: -left-96 lg:left-0 lg:w-80
  return (
    <aside
      className={`p-6 h-[calc(100vh_-_4rem)] ${showSidebarClass} w-80 lg:left-0 border-r border-l overflow-y-scroll bg-white z-20 fixed peer-focus:left-0 peer:transition ease-out delay-150 duration-200`}
    >
      {/* Ensure lg:w-80 lg:left-0 by placing them after showSidebarClass variable*/}
      <div className="flex flex-col justify-start item-center">
        <div className="pb-4 border-b w-full transition-all duration-300">
          <div className="flex flex-row items-center justify-start gap-x-2">
            <VscSettings className="text-3xl" />
            {showSidebar}
            <p className="text-base font-semibold">Applied Filters</p>
          </div>
          <div className="pt-2">
            <div className="flex flex-row flex-wrap gap-2">
              {activeTagList.map((eachTag, i) => (
                <SidebarTagRm
                  label={eachTag}
                  key={i}
                  // activeTagList={activeTagList}
                  // setActiveTagList={setActiveTagList}
                />
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
                {libraryList.map((eachTag, i) => (
                  <SidebarTag
                    key={i}
                    label={eachTag}
                    // activeTagList={activeTagList}
                    // setActiveTagList={setActiveTagList}
                  />
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
                  <SidebarTag
                    key={i}
                    label={eachTag}
                    // activeTagList={activeTagList}
                    // setActiveTagList={setActiveTagList}
                  />
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
                  <SidebarTag
                    key={i}
                    label={eachTag}
                    // activeTagList={activeTagList}
                    // setActiveTagList={setActiveTagList}
                  />
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
        <div>
          <Input label="Search For Tag..." />
        </div>
      </div>
    </aside>
  );
}
