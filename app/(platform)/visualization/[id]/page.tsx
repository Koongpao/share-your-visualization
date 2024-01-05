import Image from "next/image";
import { Button, Avatar } from "@nextui-org/react";
import { DisplayTagWithLink } from "@/app/ui/small-components/display-tag";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";
import { GetSpecificVisualization } from "@/app/lib/controller";
import { format } from "date-fns";

import { FaRegCalendarAlt } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

import { TSpecificVisualization } from "@/app/lib/definitions";
import CopyIcon from "./copy-icon";
import LikesFavorite from "./likes-favorite";

export default async function Page({ params }: { params: { id: string } }) {
  const { data, message, success }: { data: TSpecificVisualization; message: string; success: boolean } =
    await GetSpecificVisualization(params.id);

  return (
    <div className="container py-6 px-8 md:px-24 lg:px-48 pb-12">
      <div className="flex flex-col">
        <div className="text-4xl font-semibold py-2">{data.title}</div>
        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2 pt-2">
          <div className="flex flex-row gap-x-2 items-center">
            <p className="font-bold">Library</p>
            <div className="flex flex-row gap-x-1">
              <DisplayTagWithLink label={data.library.name} />
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <p className="font-bold">Tags</p>
            <div className="flex flex-row gap-x-1">
              {data.tags.length === 0 && <p className="text-slate-600 font-semibold">None</p>}
              {data.tags.map((tag: { name: string }, i) => (
                <DisplayTagWithLink key={i} label={tag.name} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between border-b py-2">
          <div className="flex flex-col md:flex-row justify-start gap-x-2 gap-y-2 py-2">
            <div className="flex flex-row items-center gap-x-2">
              <Avatar showFallback size={"sm"} />
              <p className="text-slate-600">@{data.creator.username}</p>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <FaRegCalendarAlt className="text-xl text-slate-600" />
              <p className="text-slate-600 "> Posted {format(new Date(data.created_date), "dd MMMM yyyy")}</p>
            </div>
          </div>
          <LikesFavorite visId={params.id} />
        </div>
        {data.description && (
          <div className="py-4 border-b">
            <div className="flex flex-row items-center gap-1 text-slate-600 text-lg font-semibold">
              <MdDescription className="text-2xl" />
              Description
            </div>
            {data.description}
          </div>
        )}
        <div className="py-4">
          <div className="flex justify-center pb-4">
            <Image src={data.image} alt="" width={600} height={600} quality={100} />
          </div>
        </div>
        <div className="py-4">
          <div className="text-xl flex justify-center font-semibold">Preview Demo</div>
          <div className="flex justify-center py-4">
            <Button
              className="bg-teal-600 text-white font-semibold shadow-xl"
              as={Link}
              href={data.externalLink}
              target="_blank"
            >
              {data.externalLink}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between py-2">
            <div className="text-2xl font-semibold">Source Code</div>
            <CopyIcon sourceCode={data.code} />
          </div>
          <div className="px-4 py-4 bg-gray-200 rounded-lg overflow-y-auto">
            <SyntaxHighlighter
              className="text-sm"
              style={atelierCaveLight}
              customStyle={{ backgroundColor: "inherit" }}
              wrapLongLines={true}
            >
              {data.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
