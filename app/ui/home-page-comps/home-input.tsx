"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { useAtom } from "jotai";
import { atomSearchQuery } from "@/app/atoms";
import { FaSearch } from "react-icons/fa";


export default function HomeInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Params = new URLSearchParams(searchParams);
  const [searchQuery, setSearchQuery] = useAtom(atomSearchQuery);

  return (
    <form
      className="w-3/4 lg:w-1/2 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        Params.set("search_query", searchQuery);
        router.push(`/search?${Params.toString()}`);
      }}
    >
      <Input
        // label="Visualization Title"
        // labelPlacement="outside"
        autoComplete="new-password"
        id="search"
        variant="faded"
        size={"lg"}
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
  );
}
