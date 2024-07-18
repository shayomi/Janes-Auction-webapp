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
};

const OwnerCard = ({ auction, hasOrderLink }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isAuctionCreator = auction.owner
    ? userId === auction.owner._id.toString()
    : false;

  return (
    <>
      {isAuctionCreator && (
        <div className=" relative flex w-full max-w-[300px] flex-col overflow-hidden rounded-xl border-[1px] border-blue-500 shadow-md transition-all hover:shadow-lg  hover:scale-105 duration-500">
          <div className="p-4 flex flex-col gap-y-4 items-center justify-center">
            <Link
              href={`/auction/${auction._id}`}
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

            <Link href={`/auction/${auction._id}`}>
              <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-white">
                {auction.title}
              </p>
            </Link>

            <div className="absolute right-2 top-3 flex flex-col gap-4 rounded-xl bg-blue-200 p-3 shadow-sm transition-all">
              <Link href={`/events/${auction._id}/update`}>
                <Image
                  src="/icons/edit.svg"
                  alt="edit"
                  width={20}
                  height={20}
                />
              </Link>

              <DeleteConfirmation auctionId={auction._id as string} />
            </div>
          </div>

          <div className="flex gap-2 px-4 py-2 justify-between text-white">
            <span className="p-semibold-14 w-min rounded-full bg-blue-800 px-4 py-1 text-green-60">
              ${auction.price}
            </span>
            <p className="p-semibold-14  rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-4">
              {auction.category.name}
            </p>
          </div>

          {auction.auctionStartDate && (
            <p className="p-medium-16 p-medium-18 text-grey-500 px-4 py-2 text-white">
              {formatDateTime(auction.auctionStartDate).dateOnly} -{" "}
              {formatDateTime(auction.auctionStartDate).timeOnly}
            </p>
          )}

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${auction._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default OwnerCard;
