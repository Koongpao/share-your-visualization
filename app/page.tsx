"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import { atomSearchQuery } from "@/app/atoms";
import { FaSearch } from "react-icons/fa";
import { CapitalizeWords } from "@/app/lib/functions";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Params = new URLSearchParams(searchParams);
  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);

  const searchSuggestion = [
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

  return (
    <div className="container flex flex-col justify-center items-center pt-40">
      <div className="font-medium text-2xl text-center">Search for visualizations examples</div>
      <form
        className="w-3/4 lg:w-1/2 pt-5"
        onSubmit={(e) => {
          e.preventDefault();
          Params.set("search_query", searchQuery);
          router.push(`/search?${Params.toString()}`);
        }}
      >
        <Input
          size={"sm"}
          placeholder="Search Visualization..."
          value={searchQuery}
          endContent={
            <div className="flex flex-row h-full items-center">
              <Button
                type="submit"
                className="cursor-pointer min-w-3 flex items-center bg-color-none"
                onClick={() => {
                  Params.set("search_query", searchQuery);
                  router.push(`/search?${Params.toString()}`);
                }}
              >
                <FaSearch className="text-slate-400 text-lg" />
              </Button>
            </div>
          }
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
      <div className="flex flex-row flex-wrap justify-center gap-2 py-4">
        {searchSuggestion.map((eachSuggestion, i) => (
          <Link href={`/search?tags=${eachSuggestion}`} prefetch={false} key={i}>
            <div className="flex flex-row items-center gap-1 text-gray-500 font-medium lowercase bg-gray-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              <FaSearch className="font-regular text-sm" />
              {CapitalizeWords(eachSuggestion)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
