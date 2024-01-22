"use client";
import { TlibraryAndTags, TTags } from "@/app/lib/definitions";
import { Button } from "@nextui-org/react";
import { DisplayTag } from "@/app/ui/small-components/display-tag";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { getSession } from "next-auth/react";
import { ApproveTag, DisapproveTag } from "@/app/lib/controller";
import { useRouter } from "next/navigation";

export default function TableContent({ data }: { data: TlibraryAndTags }) {
  const router = useRouter();

  const handleApprove = async (id: string) => {
    const response = await ApproveTag(getSession, id);
    router.refresh();
  };

  const handleDisapprove = async (id: string) => {
    const response = await DisapproveTag(getSession, id);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {data?.tags?.map((eachTag: TTags, i: number) => (
        <div className="grid grid-cols-12 gap-4 w-[80vh]" key={i}>
          <div className="col-span-4 flex justify-center items-center">
            <DisplayTag label={eachTag.name} />
          </div>
          <div className="col-span-4 flex justify-center items-center">
            {eachTag.is_library && <FaCheck className="text-green-600" />}
            {!eachTag.is_library && <ImCross className="text-red-600" />}
          </div>
          <div className="col-span-4 flex flex-row gap-1 justify-center items-center">
            <Button className="bg-green-600 text-white h-[2rem]" onClick={() => handleApprove(eachTag._id)}>
              Approve
            </Button>
            <Button className="bg-red-600 text-white h-[2rem]" onClick={() => handleDisapprove(eachTag._id)}>
              Disapprove
            </Button>
          </div>
        </div>
      ))}
      {data?.library?.map((eachTag: TTags, i: number) => (
        <div className="grid grid-cols-12 gap-4 w-[80vh]" key={i}>
          <div className="col-span-4 flex justify-center items-center">
            <DisplayTag label={eachTag.name} />
          </div>
          <div className="col-span-4 flex justify-center items-center">
            {eachTag.is_library && <FaCheck className="text-green-600" />}
            {!eachTag.is_library && <ImCross className="text-red-600" />}
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <Button className="bg-green-600 text-white" onClick={() => handleApprove(eachTag._id)}>
              Approve
            </Button>
            <Button className="bg-red-600 text-white" onClick={() => handleDisapprove(eachTag._id)}>
              Disapprove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
