
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/error-occured.svg" alt="Empty" height={550} width={550} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p>You are not allowed to view this page.</p>
      </div>
        <Link href="/login">
          <Button className="bg-red-400 text-white font-medium text-lg">Login</Button>
        </Link>
    </div>
  );
}
