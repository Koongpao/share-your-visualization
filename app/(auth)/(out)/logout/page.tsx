'use client'
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Page() {

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      signOut({
        callbackUrl: "/",
      });
    }, 2000);
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div>
        <IoExitOutline className="text-8xl text-teal-600" />
      </div>
      <div className="text-3xl font-semibold uppercase text-teal-600">Logged Out</div>
      <div>You will be redirected to Home Page Shortly.</div>
      <Spinner size="lg" color="default" />
      <div className="mt-6">
        <Link href="/">
          <div className="text-white bg-teal-600 font-semibold py-2 px-3 rounded-md">Home Page</div>
        </Link>
      </div>
    </div>
  );
}
