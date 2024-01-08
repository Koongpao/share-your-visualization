import Empty from "../empty";
import { GetMyFavoriteVisualizations, GetMyVisualizations } from "@/app/lib/controller";
import { VisMinicard } from "@/app/ui/small-components/vis-minicard";
import { TVisualization, TVisualizationsArray } from "@/app/lib/definitions";
import { getServerAuthSession } from "@/app/lib/auth";
import { FaRegStar, FaStar } from "react-icons/fa";

export default async function Page() {
  const { data, message, success }: { data: TVisualizationsArray; message: string; success: boolean } =
    await GetMyFavoriteVisualizations(() => getServerAuthSession());

  if (data?.length === 0) return <Empty />;

  return (
    <div className="px-6 lg:px-32">
      {/* <div className="flex flex-row items-center justify-center gap-2 pt-8 pb-4 text-xl text-slate-800 font-semibold tracking-wider uppercase">
        <FaRegStar/>
        Favorites
      </div> */}
      <div className="bg-white w-100 h-auto min-h-screen px-6 py-6">
        <div className="py-5 flex flex-row flex-wrap gap-x-6 gap-y-6 justify-evenly">
          {data?.map((eachCard: TVisualization, i: number) => (
            <VisMinicard key={i} cardInfo={eachCard} />
          ))}
        </div>
      </div>
    </div>
  );
}
