import Image from "next/image";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { Button } from "@nextui-org/react";

export default function PostFailed() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/post-failed.svg" alt="Empty" height={350} width={350} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p className="flex flex-row items-center gap-2">
          Failed to post visualization.
          <ImCross className="text-red-400"/>
        </p>
      </div>
      <div className="font-bold text-lg">This may have been caused by server, network or client-side issues.</div>
      <Link href="/">
        <Button className="bg-red-400 text-white font-medium text-lg">Please try again later.</Button>
      </Link>
    </div>
  );
}
