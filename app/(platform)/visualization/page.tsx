"use client";

import Image from "next/image";
import { Button, Avatar } from "@nextui-org/react";
import { DisplayTag } from "@/app/ui/small-components/DisplayTag";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "@/app/lib/controller";
import { useEffect, useState } from "react";
import Loading from "./loading";
import {SourceCode} from "./SourceCode"

import {
  FaRegCalendarAlt,
  FaRegHeart,
  FaHeart,
  FaRegCopy,
  FaCalendarAlt,
  FaRegStar,
} from "react-icons/fa";

import { MdFavoriteBorder } from "react-icons/md";

import ClipboardJS from "clipboard";


export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        setIsLoading(true)
        const data = await fetchData();
        console.log("test", data);
      } catch (error) {
        // Handle error, if needed
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchDataAndSetState();
  },[]);

  if (isLoading) return <Loading/>

  return (
    <div className="container py-6 px-8 md:px-24 lg:px-48 pb-12">
      <div className="flex flex-col">
        <div className="text-4xl font-semibold py-2">
          Loess Regression Example
        </div>
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 pt-2">
          <div className="flex flex-row gap-x-2">
            <p className="font-bold">Library</p>
            <div className="flex flex-row gap-x-1">
              <DisplayTag label="d3.js" />
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="font-bold">Tags</p>
            <div className="flex flex-row gap-x-1">
              <DisplayTag label="graph_bar" />
              <DisplayTag label="regression" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between border-b py-2">
          <div className="flex flex-col md:flex-row justify-start gap-x-2 gap-y-2 py-2">
            <div className="flex flex-row items-center gap-x-2">
              <Avatar
                showFallback
                size={"sm"}
                src="https://images.unsplash.com/broken"
              />
              <p className="text-slate-600">@Username</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <FaRegCalendarAlt className="text-xl text-slate-600" />
              <p className="text-slate-600 "> Posted 21 December 2022</p>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row items-center gap-x-2 cursor-pointer">
              <FaRegStar className="text-slate-600 text-xl" />
              <p>Favorite</p>
            </div>
            <div className="flex flex-row items-center gap-x-2 cursor-pointer">
              <FaRegHeart className="text-slate-600 text-xl" />
              <p>Likes</p>
            </div>
          </div>
        </div>
        <div className="py-4">
          Locally-estimated regression produces a trend line by performing
          weighted regressions over a sliding window of points. The loess method
          (for locally-estimated scatterplot smoothing) computes a sequence of
          local linear regressions to estimate smoothed points. The bandwidth
          parameter determines the size of the sliding window of
          nearest-neighbor points, expressed as a fraction of the total number
          of points included. Alternatively, see the regression example for
          regression results using parametric functions.
        </div>
        <div>
          <div className="flex justify-center">
            <Image
              src="/loess_regression.png"
              alt=""
              width={900}
              height={400}
            />
          </div>
          <div className="flex justify-center">
            <Button className="bg-teal-600 text-white font-semibold shadow-xl">
              Preview Demo
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between py-2">
            <div className="text-2xl font-semibold">Source Code</div>
            <div
              id="#copy-code"
              className="text-lg text-slate-500 cursor-pointer flex flex-row items-center gap-x-1"
              onClick={() => {
                ClipboardJS.copy(SourceCode);
                toast.info("Text copied to clipboard", {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
            >
              <FaRegCopy />
              Copy
            </div>
          </div>
          <div className="px-4 py-4 bg-gray-200 rounded-lg overflow-y-auto">
            <SyntaxHighlighter
              className="text-sm"
              style={atelierCaveLight}
              customStyle={{ backgroundColor: "inherit" }}
              wrapLongLines={true}
            >
              {SourceCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
