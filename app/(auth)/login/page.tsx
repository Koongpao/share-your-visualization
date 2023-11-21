"use client";
import React from "react";
import Link from "next/link";
import { Button, Input } from "@nextui-org/react";

export default function Page() {
  return (
    <div className="container w-screen h-screen">
      <div className="w-full sm:w-1/2 mx-auto flex flex-col justify-center items-center h-screen gap-y-6">
        <div className="font-bold text-4xl text-teal-700">Log in</div>
        <div className="w-full sm:w-1/2 my-6 flex gap-y-2 flex-col text-slate-500">
          <Input size={"sm"} className="" placeholder="Username" type="text" />
          <Input size={"sm"} className="" placeholder="Password" type="password" />
        </div>
        <div className="w-full sm:w-1/2">
          <Button className="bg-teal-600 w-full text-white font-semibold">
            Log In
          </Button>
        </div>
        <div className="w-full sm:w-1/2 border-b"></div>
        <div className="text-slate-400 font-semibold">or</div>
        <div>
          <p className="text-slate-400 font-semibold">
            Don&rsquo;t have an account?{" "}
            <Link className="text-teal-600" href="/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
