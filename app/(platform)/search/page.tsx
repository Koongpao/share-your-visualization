"use client";
import { fetchData } from "@/app/lib/controller";
import { VisMinicard } from "@/app/ui/small-components/VisMinicard";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomTagList } from "@/app/atoms";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { availableTagList } from "@/app/ui/VisSidebar";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    tags?: string;
  };
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagList, setTagList] = useAtom(atomTagList);

  var cardData =
    [
      {
        source_code: "test",
        title: "Loess Regression",
        image: "/loess_regression.png",
        user: "@Username",
        date: "12 December 2023",
        library: "d3.js",
        tags: ["graph", "static", "dynamic", "interactive"],
      },
      {
        source_code: "test2",
        title: "test",
        image: "/country.png",
        user: "@Admin",
        date: "15 December 2023",
        library: "vega",
        tags: ["graph"],
      },
      {
        source_code: "test2",
        title: "test",
        image: "/high.png",
        user: "@Admin",
        date: "15 December 2023",
        library: "vega",
        tags: ["graph"],
      },
    ] || null;

  cardData = Array.from({ length: 6 }, () => [...cardData]).flat();

  var searchParamTags = searchParams?.tags ? searchParams.tags.split(" ") : [];
  searchParamTags = searchParamTags.filter((item, pos) => {
    return searchParamTags.indexOf(item) === pos;
  });
  //extract searchParams by 1. select the tags value, 2. split the tags value by " ", 3.remove duplicates by filter

  const fetchDataAndSetState = async () => {
    setIsLoading(true);

    try {
      const data = await fetchData();
      console.log("test", data);
    } catch (error) {
      // Handle error, if needed
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateURL = () => {
    if (tagList.length > 0) {
      router.push(`/search?tags=${tagList.join("+")}`);
    } else {
      router.push(`/search`);
    }
  };

  const extractSearchParams = () => {
    // searchParamTags.filter((tags, index) => {searchParamTags.indexOf(tags) === index})

    console.log(searchParamTags);

    searchParamTags.forEach((eachTag) => {
      if (!availableTagList.includes(eachTag)) {
        // If tag is not available, terminate the function
        console.log("Tag not found:", eachTag);
        return;
      }
      if (!tagList?.includes(eachTag)) {
        // Check if the tag is already in the list
        console.log("Valid tag:", eachTag);
        setTagList((prevTagList) => [...prevTagList, eachTag]);
      }
    });
  };

  useEffect(() => {
    //initialize searchParams
    extractSearchParams();
  }, []);

  useEffect(() => {
    //called everytime tagList is changed
    fetchDataAndSetState();
    updateURL();
  }, [tagList]);

  if (isLoading) return <Loading />;

  return (
    <div className="px-6">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="w-full border-b py-2">
          <div className="text-lg font-medium text-slate-600">Showing Results for </div>
        </div>
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
          {cardData?.map((cardInfo, i) => (
            <VisMinicard key={i} cardInfo={cardInfo} />
          ))}
        </div>
      </div>
    </div>
  );
}
