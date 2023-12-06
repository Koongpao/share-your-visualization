import { atomTagList } from "@/app/atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import { MouseEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import { KnownLibraries } from "@/app/lib/knownLibraries";
import { availableTagList } from "../VisSidebar";

interface SidebarTagProps {
  label: string;
  // activeTagList?: string[];
  // setActiveTagList?: React.Dispatch<React.SetStateAction<string[]>>;
}

const CapitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function SidebarTag({
  label,
  // activeTagList,
  // setActiveTagList,
}: SidebarTagProps) {
  //used in VisSidebar component

  const [activeTagList,setActiveTagList] = useAtom(atomTagList)

  const CapitalizedLabel = CapitalizeWords(label);

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo.bgColor : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo.logo : "";

  const currentColor = activeTagList?.includes(label)
    ? libraryColor
    : "bg-slate-200";
  const currentText = activeTagList?.includes(label)
    ? "text-white"
    : "text-black";

  const handleTagClick = async (event: MouseEvent<HTMLDivElement>) => {
    console.log(availableTagList)
    if (!availableTagList.includes(label)) {
      // If tag is not available, terminate the function
      console.log("Tag not found")
      return;
    }
    // Check if the tag is already in the list
    if (!activeTagList?.includes(label)) {
      // If not, add the label to the list
      setActiveTagList?.((prevTagList) => [...prevTagList, label]);
    } else if (activeTagList?.includes(label)) {
      // If it is, remove label from the list
      setActiveTagList?.((prevTagList) =>
        prevTagList.filter((tag) => tag !== label)
      );
    }
  };

  return (
    <div className="flex">
      <div
        className={`inline-flex items-center rounded-full border px-2.5 h-[2rem]
      py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 
      focus:ring-ring focus:ring-offset-2 border-transparent ${currentColor}  
      ${currentText} hover:${currentColor}/80 flex-row gap-x-1 cursor-pointer`}
        onClick={handleTagClick}
      >
        {libraryImageSrc ? (
          <Image src={libraryImageSrc} alt="" width={16} height={16} />
        ) : null}
        {CapitalizedLabel}
      </div>
    </div>
  );
}

export function SidebarTagRm({
  label,
  // activeTagList,
  // setActiveTagList,
}: SidebarTagProps) {
  //used in VisSidebar component
  const CapitalizedLabel = CapitalizeWords(label);

  const [activeTagList,setActiveTagList] = useAtom(atomTagList)

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo.bgColor : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo.logo : "";

  const handleRemoveClick = (event: MouseEvent<HTMLDivElement>) => {
    setActiveTagList?.((prevTagList) =>
      prevTagList.filter((tag) => tag !== label)
    );
  };

  return (
    <div className="flex">
      <div
        className={`inline-flex items-center rounded-full border px-2.5 h-[2rem]
        py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 
        focus:ring-ring focus:ring-offset-2 border-transparent ${libraryColor}  
        text-white hover:${libraryColor}/80 flex-row gap-x-1 cursor-pointer`}
      >
        {libraryImageSrc ? (
          <Image src={libraryImageSrc} alt="" width={16} height={16} />
        ) : null}
        {CapitalizedLabel}
        <RxCross2 className="text-xl" onClick={handleRemoveClick} />
      </div>
    </div>
  );
}
