import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Unauthenticated() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/unauthenticated.svg" alt="Empty" height={450} width={450} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p>You must be logged in to access this page.</p>
      </div>
        <Link href="/login">
          <Button className="bg-teal-600 text-white font-medium text-lg">Login</Button>
        </Link>
    </div>
  );
}
