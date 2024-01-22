"use client";
import { Button } from "@nextui-org/react";
import { TVisualization } from "@/app/lib/definitions";
import { ApproveVisualization, DisapproveVisualization } from "@/app/lib/controller";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Review({ visId }: { visId: string }) {
  const router = useRouter();

  const handleApprove = async () => {
    const { data, message, success }: { data: TVisualization; message: string; success: boolean } =
      await ApproveVisualization(getSession, visId);
    router.refresh()
  };

  const handleDisapprove = async () => {
    const { data, message, success }: { data: TVisualization; message: string; success: boolean } =
      await DisapproveVisualization(getSession, visId);
      router.refresh()
  };

  return (
    <div className="flex flex-col justify-center bg-slate-50 border-1 border-slate--600 py-5 my-4 mx-24 items-center">
      <div className="font-medium text-slate-700 text-xl flex flex-row gap-1 items-center">Review Visualization</div>
      <div className="flex flex-row items-center gap-5 justify-center my-2">
        <Button className="bg-green-600 text-white text-lg font-medium" onClick={() => handleApprove()}>
          Approve
        </Button>
        <Button className="bg-red-600 text-white text-lg font-medium" onClick={() => handleDisapprove()}>
          Disapprove
        </Button>
      </div>
    </div>
  );
}
