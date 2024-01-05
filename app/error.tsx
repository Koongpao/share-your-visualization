"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";
export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        <Image src="/page-pics/error-occured.svg" alt="Empty" height={700} width={700} />
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        <p>An Error has Occured.</p>
      </div>
      <div className="text-lg text-center font-medium">
        This may have been caused by server, network or client-side issues. Please try again later.
      </div>

      <Link href="/">
        <Button className="bg-red-400 text-white font-medium text-lg">Back to Home</Button>
      </Link>
    </div>
  );
}
