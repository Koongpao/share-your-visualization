import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";

export default function PostSuccess() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/post-success.svg" alt="Empty" height={350} width={350} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p className="flex flex-row items-center gap-2">
          Successfully posted visualization <FaCheck className="text-green-500" />
        </p>
      </div>
      <div className="font-bold text-lg">Your visualization will be reviewed before publishing to public.</div>
      <Link href="/user/my-visualizations">
        <Button className="bg-teal-600 text-white font-medium text-lg">View My Visualizations</Button>
      </Link>
      <Link href="/post">
        <Button className="bg-teal-600 text-white font-medium text-lg">Post More Visualizations</Button>
      </Link>
    </div>
  );
}
