import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
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

export default function VisMinicard({ cardInfo }: VisMinicardProps) {
  return (
    <Card className="py-4 w-80 h-[20rem] max-h-[20rem]">
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
        <div className="overflow-x-auto inline-block items-center py-1">
          <div className="flex flex-row gap-x-1  whitespace-nowrap">
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
