import { GetPendingVisualizations } from "@/app/lib/controller";
import { TVisualization, TVisualizationsArray } from "@/app/lib/definitions";
import { getServerAuthSession } from "@/app/lib/auth";
import { VisMinicardStatus } from "@/app/ui/small-components/vis-minicard";

export default async function Page() {
  const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
    await GetPendingVisualizations(() => getServerAuthSession());

  return (
    <div className="px-6 lg:px-32">
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        {data?.length === 0 && (
          <div className="text-center text-2xl font-bold text-gray-500">No pending visualization.</div>
        )}
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
          {data?.map((eachCard: TVisualization, i: number) => (
            <VisMinicardStatus key={i} cardInfo={eachCard} />
          ))}
        </div>
      </div>
    </div>
  );
}
