import { TagListDisplayTag, TagListDisplayTagLanguage } from "@/app/ui/small-components/display-tag";
import { GetAllTags } from "@/app/lib/controller";
import { TlibraryAndTags } from "@/app/lib/definitions";

export default async function Page() {
  const { data, message, success }: { data: TlibraryAndTags; message: string; success: boolean } = await GetAllTags();
  const libraryTags = data.library.filter(tags => tags.status === "approved")
  const nonLibraryTags = data.tags.filter(tags => tags.status === "approved")

  return (
    <div className="py-6 px-8 md:px-24 lg:px-36 xl:container xl:px-80 pb-12 flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center text-2xl font-bold mb-6 border-b">
        <div className="text-gray-400">{libraryTags.length + nonLibraryTags.length}</div>
        <div>Tags</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {libraryTags.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-2" key={`library-${i}`}>
            <TagListDisplayTag label={tag.name} />
            <div className="text-white font-semibold bg-emerald-500 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-emerald-600 flex flex-row items-center gap-1">
              Library
            </div>
            {/* <TagListDisplayTagLanguage label={tag}/> */}
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag.name}
            </div>
          </div>
        ))}

        {nonLibraryTags.map((tag, i) => (
          <div className="flex flex-row flex-wrap items-center gap-3" key={`tag-${i}`}>
            <TagListDisplayTag label={tag.name} />
            <div className="text-slate-500 font-semibold lowercase bg-slate-200 py-0.5 px-2.5 shadow-sm border-b-1 border-r-1 border-slate-300">
              {tag.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
