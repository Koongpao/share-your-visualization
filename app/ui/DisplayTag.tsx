import Image from "next/image";

export default function DisplayTag({ label }: { label: string }) {
  const SpecialCase = false;

  const CapitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const CapitalizedLabel = CapitalizeWords(label);

  const KnownLibraries: Record<string, string[]> = {
    "vega": ["bg-blue-400", "/library-icons/vega_logo.png"],
    "altair": ["bg-blue-400", "/library-icons/altair_logo.png"],
    "d3.js": ["bg-orange-300", "/library-icons/d3js_logo.png"],
  };

  const libraryInfo = KnownLibraries[label];
  const libraryColor = libraryInfo ? libraryInfo[0] : "bg-teal-500";
  const libraryImageSrc = libraryInfo ? libraryInfo[1] : "";

  return (
    <div className="flex">
      <div
        className={`inline-flex items-center rounded-full border px-2.5 
      py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 
      focus:ring-ring focus:ring-offset-2 border-transparent ${libraryColor}  
      text-white hover:${libraryColor}/80 flex-row gap-x-1`}
      >
        {libraryImageSrc ? (
          <Image src={libraryImageSrc} alt="" width={16} height={16} />
        ) : null}
        {CapitalizedLabel}
      </div>
    </div>
  );
}
