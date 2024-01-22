import { TTags, TlibraryAndTags } from "@/app/lib/definitions";
import { getServerAuthSession } from "@/app/lib/auth";
import { GetRequestedTags } from "@/app/lib/controller";
import TableContent from "./table";

export default async function Page() {
  const { data, message, success }: { data: TlibraryAndTags; message: string; success: boolean } =
    await GetRequestedTags(() => getServerAuthSession());

  return (
    <div className="flex flex-col justify-center items-center pt-8">
      <div className="grid grid-cols-12 gap-4 w-[80vh] pb-6 uppercase text-neutral-600 font-semibold">
        <div className="col-span-4 flex justify-center bg-slate-100 py-2 rounded-lg">Tag Name</div>
        <div className="col-span-4 flex justify-center bg-slate-100 py-2 rounded-lg">Is Library</div>
        <div className="col-span-4 flex justify-center bg-slate-100 py-2 rounded-lg">Approve</div>
      </div>
      <div>
        <TableContent data={data} />
        {data?.tags?.length === 0 && data?.library?.length === 0 && (
          <div className="text-center text-2xl font-bold text-gray-500">No requested tags.</div>
        )}
      </div>
    </div>
  );
}
