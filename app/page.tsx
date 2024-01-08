import { FaSearch } from "react-icons/fa";
import { CapitalizeWords } from "@/app/lib/functions";
import Link from "next/link";
import { DisplayTagSearchIcon } from "@/app/ui/small-components/display-tag";
import bgImage2 from "../public/bgviz20.png";
import HomeInput from "./ui/home-page-comps/home-input";
import Image from "next/image";
import { searchSuggestion, librarySuggestion } from "./lib/resources";

export default function Home() {

  return (
    <div className="min-h-screen bg-cover" style={{ backgroundImage: `url(${bgImage2.src})` }}>
      <div className="container flex flex-col justify-center gap-y-4 pt-24 lg:pt-36">
        <div className="font-bold text-4xl text-center mb-2">Explore Visualizations Examples</div>
        <div className="text-base text-center mb-2">Find examples or inspirations for your visualization. </div>
        <div className="flex justify-center">
          <HomeInput />
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-2 py-2 lg:py-4">
          {searchSuggestion.map((eachSuggestion, i) => (
            <Link href={`/search?tags=${eachSuggestion}`} prefetch={false} key={i}>
              <div className="flex flex-row items-center gap-1 text-gray-500 font-medium lowercase bg-gray-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
                <FaSearch className="font-regular text-sm" />
                {CapitalizeWords(eachSuggestion)}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-2 py-2 lg:py-4">
          {librarySuggestion.map((eachSuggestion, i) => (
            <DisplayTagSearchIcon label={eachSuggestion} key={i} />
          ))}
        </div>
      </div>

      {/* <div className="inline-flex flex-col h-fit justify-center items-center bg-white shadow-md py-12 px-2 rounded-xl"> */}

      {/* <div className="my-20">
        <div className="w-[1440px] leading-[0px] mx-auto">
          {Array.from({ length: 16 }).map((_, index) => (
            <div
              className="relative h-[120px] w-[180px] inline-block hover:brightness-90 transition-all ease-in-out duration-200"
              key={index}
            >
              <Link href={`/visualization/`} prefetch={false}>
                <Image
                  alt="Card background"
                  src="https://share-your-visualization-uploads.s3.ap-southeast-1.amazonaws.com/00d7552d5c386595906f8501eec7076dc2fd38b6134d5786a3b31914b57862a8.png"
                  fill
                  className=""
                />
              </Link>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
