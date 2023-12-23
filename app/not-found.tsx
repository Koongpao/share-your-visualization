import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/404-not-found.svg" alt="Empty" height={500} width={500} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p>404 - Page Not Found</p>
      </div>

      <Link href="/">
        <Button className="bg-red-400 text-white font-medium text-lg">Back to Home</Button>
      </Link>
    </div>
  );
}
