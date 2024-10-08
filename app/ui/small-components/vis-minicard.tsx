import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
import { FaHeart, FaRegCalendarAlt } from "react-icons/fa";
import { DisplayTagWithLink, MiniDisplayTag, TagListDisplayTag } from "./display-tag";
import { TVisualization } from "@/app/lib/definitions";
import { format } from "date-fns";
import { CapitalizeWords } from "@/app/lib/functions";
import clsx from "clsx";
import { FaRegHeart } from "react-icons/fa6";

interface VisMinicardProps {
  cardInfo: TVisualization;
}

export function VisMinicard({ cardInfo }: VisMinicardProps) {
  return (
    <Card className="pt-4 pb-2 w-80 h-[auto]">
      <CardHeader className="pb-0 pt-2 px-4 flex items-start h-[10rem] max-h-[10rem] relative">
        <Link href={`/visualization/${cardInfo._id}`} prefetch={false}>
          <Image alt="Card background" className="object-cover w-full h-full rounded-xl" src={cardInfo.image} fill />
        </Link>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-row justify-between">
        <div className="max-w-[90%]">
          <h4 className="font-bold text-large whitespace-nowrap overflow-hidden overflow-ellipsis">{cardInfo.title}</h4>
          <div className="flex flex-row gap-x-1 items-center">
            <p className="text-sm font-medium">By @{cardInfo.creator.username}</p>
          </div>
          <div className="text-default-500 text-sm flex flex-row gap-x-1 items-center">
            <FaRegCalendarAlt className="text-slate-600 text-md" />
            {format(new Date(cardInfo.created_date), "dd MMMM yyyy")}
          </div>
          <div className="inline-block items-center py-1">
            <div className="flex flex-row gap-1 whitespace-nowrap flex-wrap lg:flex-nowrap lg:overflow-scroll">
              <DisplayTagWithLink label={cardInfo.library.name} />
              {/* {cardInfo.tags.map((tagsInfo, i) => (
              <MiniDisplayTag label={tagsInfo} key={i} />
            ))} */}

              {cardInfo.tags.length !== 0 && <MiniDisplayTag label={cardInfo.tags.length.toString() + " More Tags"} />}
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center mt-2">
            <FaRegHeart className="text-xs text-neutral-400" /> <div className="text-xs">{cardInfo.likes.length}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function VisMinicardSkeleton() {
  return (
    <Card className="py-4 w-80 h-[20rem] max-h-[20rem]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start h-[10rem] max-h-[10rem] relative">
        <Skeleton className="rounded-lg w-full h-full" />
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-2 px-4">
        <Skeleton className="rounded-lg w-3/5 h-2/5" />
        <Skeleton className="rounded-lg w-4/5 h-2/5" />
        <Skeleton className="rounded-lg w-2/5 h-2/5" />
        <div className="flex flex-row gap-1 h-2/5">
          <Skeleton className="rounded-lg w-1/5 h-4/5" />
          <Skeleton className="rounded-lg w-1/5 h-4/5" />
          <Skeleton className="rounded-lg w-1/5 h-4/5" />
        </div>
      </CardBody>
    </Card>
  );
}

export function VisMinicardStatus({ cardInfo }: VisMinicardProps) {
  return (
    <Card className="pt-4 w-80 h-[auto]">
      <CardHeader className="pb-0 pt-2 px-4 flex items-start h-[10rem] max-h-[10rem] relative">
        <Link href={`/visualization/${cardInfo._id}`} prefetch={false}>
          <Image alt="Card background" className="object-cover w-full h-full rounded-xl" src={cardInfo.image} fill />
        </Link>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large whitespace-nowrap overflow-hidden overflow-ellipsis">{cardInfo.title}</h4>
        <div className="flex flex-row gap-x-1 items-center">
          <p className="text-sm font-medium">By @{cardInfo.creator.username}</p>
        </div>
        <div className="text-default-500 text-sm flex flex-row gap-x-1 items-center">
          <FaRegCalendarAlt className="text-slate-600 text-md" />
          {format(new Date(cardInfo.created_date), "dd MMMM yyyy")}
        </div>
        <div className="inline-block items-center">
          <div className="flex flex-row gap-1 whitespace-nowrap flex-wrap lg:flex-nowrap lg:overflow-scroll">
            <DisplayTagWithLink label={cardInfo.library.name} />
            {/* {cardInfo.tags.map((tagsInfo, i) => (
              <MiniDisplayTag label={tagsInfo} key={i} />
            ))} */}

            {cardInfo.tags.length !== 0 && <MiniDisplayTag label={cardInfo.tags.length.toString() + " More Tags"} />}
          </div>
        </div>
      </CardBody>
      <div
        className={clsx(
          "flex flex-row items-center justify-center gap-1 border-t mt-2",
          { "bg-green-500": cardInfo.status === "approved" },
          { "bg-red-500": cardInfo.status === "disapproved" },
          { "bg-yellow-400": cardInfo.status === "pending" }
        )}
      >
        {/* <div className="bg-green-400 w-[1rem] h-[1rem] rounded-full"></div> */}
        <div className="font-medium text-white">{CapitalizeWords(cardInfo.status)}</div>
      </div>
    </Card>
  );
}
