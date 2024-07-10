import { IAuction } from "@/lib/database/models/auction.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  auction: IAuction;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ auction, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isAuctionCreator = auction.owner
    ? userId === auction.owner._id.toString()
    : false;

  return (
    <div className="group relative flex w-full max-w-[300px] flex-col overflow-hidden rounded-xl border-[1px] border-blue-500 shadow-md transition-all hover:shadow-lg ">
      <div className="p-4 flex flex-col gap-y-4 items-center justify-center">
        <Link
          href={`/events/${auction._id}`}
          // style={{ backgroundImage: `url(${auction.imageUrl})` }}
          className=""
        >
          <Image
            src={auction.imageUrl}
            width={200}
            height={300}
            alt="janesart"
            className=""
          />
        </Link>

        <Link href={`/events/${auction._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-white">
            {auction.title}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
