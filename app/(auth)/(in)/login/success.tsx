'use client'
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.refresh();
      router.push("/");
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div>
        <FaRegCheckCircle className="text-8xl text-teal-600" />
      </div>
      <div className="text-3xl font-semibold uppercase text-teal-600">Login Success</div>
      <div>You will be redirected to Home Page Shortly.</div>
      <Spinner size="lg" color="default" />
      {/* <div className="mt-6">
        <Link href="/">
          <div className="text-white bg-teal-600 font-semibold py-2 px-3 rounded-md">Home Page</div>
        </Link>
      </div> */}
    </div>
  );
}
