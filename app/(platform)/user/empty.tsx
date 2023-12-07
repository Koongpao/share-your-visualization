"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { usePathname } from "next/navigation";

export default function Empty() {
  const currentPath = usePathname();
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div className="mt-4">
        {currentPath === "/user/my-visualizations" && (
          <Image src="/page-pics/empty-my-visualizations.svg" alt="Empty" height={650} width={650} />
        )}
        {currentPath === "/user/favorites" && (
          <Image src="/page-pics/empty-favorites.svg" alt="Empty" height={450} width={450} />
        )}
      </div>
      <div className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-slate-700 text-center">
        {currentPath === "/user/my-visualizations" && <p>You have not posted any Visualization yet.</p>}
        {currentPath === "/user/favorites" && <p>You don't have any favorite Visualization yet.</p>}
      </div>
      {currentPath === "/user/my-visualizations" && (
        <Link href="/post">
          <Button className="bg-teal-600 text-white font-medium text-lg">Post Visualization</Button>
        </Link>
      )}
      {currentPath === "/user/favorites" && (
        <Link href="/search">
          <Button className="bg-teal-600 text-white font-medium text-lg">Explore Visualization</Button>
        </Link>
      )}
    </div>
  );
}
