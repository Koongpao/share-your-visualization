import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DisplayTag, MiniDisplayTag } from "./DisplayTag";

interface VisMinicardProps {
  cardInfo: {
    title: string;
    image: string;
    user: string;
    date: string;
    library: string;
    tags: string[];
  };
}

export function VisMinicard({ cardInfo }: VisMinicardProps) {
  return (
    <Card className="pt-4 pb-2 w-80 h-[auto]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start h-[10rem] max-h-[10rem] relative">
        <Link href="/visualization">
          <Image
            alt="Card background"
            className="object-cover w-full h-full rounded-xl"
            src={cardInfo.image}
            fill
          />
        </Link>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h4 className="font-bold text-large whitespace-nowrap overflow-hidden overflow-ellipsis">
          {cardInfo.title}
        </h4>
        <div className="flex flex-row gap-x-1 items-center">
          <p className="text-sm">{cardInfo.user}</p>
        </div>
        <div className="text-default-500 text-sm flex flex-row gap-x-1 items-center">
          <FaRegCalendarAlt className="text-slate-600 text-md" />
          {cardInfo.date}
        </div>
        <div className="inline-block items-center py-1">
          <div className="flex flex-row gap-1 whitespace-nowrap flex-wrap lg:flex-nowrap lg:overflow-scroll">
            <DisplayTag label={cardInfo.library} />
            {cardInfo.tags.map((tagsInfo, i) => (
              <MiniDisplayTag label={tagsInfo} key={i} />
            ))}
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
