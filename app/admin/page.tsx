import { Card, CardFooter } from "@nextui-org/react";
import { FaFile } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-6 mt-24">
      <Link href="/admin/pending-visualizations">
        <Card className="w-[20rem] h-[30rem] flex flex-col justify-center items-center gap-y-4">
          <Image src="/page-pics/pending-visualizations.svg" alt="" width={400} height={400} />
          <div className="font-semibold text-neutral-600">Pending Visualizations</div>
        </Card>
      </Link>
      <Link href="/admin/requested-tags">
        <Card className="w-[20rem] h-[30rem] flex flex-col justify-center items-center">
          <Image src="/page-pics/requested-tags.svg" alt="" width={400} height={400} />
          <div className="font-semibold text-neutral-600">Requested Tags</div>
        </Card>
      </Link>
    </div>
  );
}
