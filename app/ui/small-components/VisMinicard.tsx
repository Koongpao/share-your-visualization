import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DisplayTag, MiniDisplayTag } from "./DisplayTag";

interface VisMinicardProps {
  cardInfo: {
    title: string;
    user: string;
    date: string;
    library: string;
    tags: string[];
  };
}

export default function VisMinicard({ cardInfo }: VisMinicardProps) {
  return (
    <Card className="py-4 w-80">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Link href="/visualization">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="/loess_regression.png"
            width={270}
            height={400}
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
