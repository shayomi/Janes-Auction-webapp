import { IAuction } from "@/lib/database/models/auction.model";
import React from "react";
import OwnerCard from "./OwnerCard";

type CollectionProps = {
  data: IAuction[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Auction_Created" | "My_Auctions" | "All_Auctions";
};

const OwnerCollection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-start">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-10">
            {data.map((auction) => {
              const hasOrderLink = collectionType === "Auction_Created";

              return (
                <li key={auction._id as React.Key} className="flex ">
                  <OwnerCard auction={auction} hasOrderLink={hasOrderLink} />
                </li>
              );
            })}
          </ul>

          {/* {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )} */}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center text-white">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default OwnerCollection;
