import Image from "next/image";
import Link from "next/link";
import { KnownLibraries } from "@/app/lib/knownLibraries";
import clsx from "clsx";

const CapitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function DisplayTag({ label }: { label: string }) {
  //used in /visualization
  const CapitalizedLabel = CapitalizeWords(label);

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo.bgColor : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo.logo : "";

  return (
    <Link href={`/search?tags=${label}`} prefetch={false} target="_blank">
      <div className="flex min-w-fit">
        <div
          className={`inline-flex items-center rounded-full border px-2.5
      py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 
      focus:ring-ring focus:ring-offset-2 border-transparent text-white ${libraryColor}  
       hover:${libraryColor}/80 flex-row gap-x-1 `}
        >
          {libraryImageSrc ? <Image src={libraryImageSrc} alt="" width={16} height={16} /> : null}
          {CapitalizedLabel}
        </div>
      </div>
    </Link>
  );
}

export function MiniDisplayTag({ label }: { label: string }) {
  //used in /search card
  const CapitalizedLabel = CapitalizeWords(label);

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo.bgColor : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo.logo : "";

  return (
    <div className="flex min-w-fit">
      <div
        className={`inline-flex items-center rounded-full border px-1.5 
      py-0.5 text-2xs font-semibold transition-colors focus:outline-none focus:ring-2 
      focus:ring-ring focus:ring-offset-2 border-transparent text-white ${libraryColor}  
       hover:${libraryColor}/80 flex-row gap-x-1 `}
      >
        {libraryImageSrc ? <Image src={libraryImageSrc} alt="" width={16} height={16} /> : null}
        {CapitalizedLabel}
      </div>
    </div>
  );
}

export function TagListDisplayTag({ label }: { label: string }) {
  //used in /tag-list
  const CapitalizedLabel = CapitalizeWords(label);

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo.bgColor : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo.logo : "";

  return (
    <Link href={`/search?tags=${label}`} prefetch={false} target="_blank">
      <div className="flex min-w-fit">
        <div
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 
      focus:ring-ring focus:ring-offset-2 border-transparent text-white ${libraryColor}  
       hover:${libraryColor}/80 flex-row gap-x-1`}
        >
          {libraryImageSrc ? <Image src={libraryImageSrc} alt="" width={16} height={16} /> : null}
          {CapitalizedLabel}
        </div>
      </div>
    </Link>
  );
}

export function TagListDisplayTagLanguage({ label }: { label: string }) {
  //used in /tag-list to classify language category

  const libraryInfo = KnownLibraries[label];

  if (libraryInfo === undefined) return <></>;

  const libraryLanguage = libraryInfo.language;

  return (
    <div
      className={clsx(
        "flex flex-row gap-1 items-center text-slate-500 font-semibold uppercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300",
        { "bg-yellow-200": libraryLanguage === "JS" },
        { "bg-indigo-300 text-white": libraryLanguage === "JSON" },
        { "normal-case bg-sky-500 text-white": libraryLanguage === "Python" }
      )}
    >
      {libraryLanguage === "JS" ? <Image src="/language-icons/js.png" alt="" width={16} height={16} /> : null}
      {libraryLanguage === "Python" ? <Image src="/language-icons/python.png" alt="" width={16} height={16} /> : null}
      {libraryLanguage === "JSON" ? <Image src="/language-icons/json.png" alt="" width={16} height={16} /> : null}
      {libraryLanguage}
    </div>
  );
}
