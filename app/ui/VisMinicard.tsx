import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function VisMinicard({
  cardInfo,
}: {
  cardInfo: {
    source_code: string;
    title: string;
    user: string;
    date: string;
    library: string;
    tags: string[];
  };
}) {
  return (
    <Card className="py-4 w-100 sm:w-72">
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
        <p className="text-tiny">{cardInfo.user}</p>
        <small className="text-default-500">{cardInfo.date}</small>
      </CardBody>
    </Card>
  );
}
