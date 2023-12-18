import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Success() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-[80vh]">
      <div>
        <FaRegCheckCircle className="text-8xl text-teal-600"/>
      </div>
      <div className="text-3xl font-semibold uppercase text-teal-600">Registration Success</div>
      <div>Your account has been successfully created.</div>
      <div className="mt-6">
        <Link href="/login">
        <div className="text-white bg-teal-600 font-semibold py-2 px-3 rounded-md" >Continue To Login</div>
        </Link>
      </div>
    </div>
  );
}
