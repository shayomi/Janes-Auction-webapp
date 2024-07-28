import CategoryFilter from "@/components/shared/CategoryFilter";
import OwnerCollection from "@/components/shared/OwnerCollection";
import Search from "@/components/shared/Search";
import { getAllAuction } from "@/lib/actions/auction.action";
import { SearchParamProps } from "@/types";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { IAuction } from "@/lib/database/models/auction.model";
import Link from "next/link";

export default async function Profile({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const auctions = await getAllAuction({
    query: searchText,
    category,
    page,
    limit: 24,
  });

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Filter auctions to only include those created by the logged-in user
  const userAuctions = auctions?.data.filter(
    (auction: IAuction) => auction.owner?._id.toString() === userId
  );

  return (
    <section className="max-w-[1440px] w-full flex flex-col md:px-12 md:py-0 p-12 mt-12">
      <div className=" flex items-center justify-center sm:justify-left">
        <Link
          href="/profile"
          className="h4-bold text-center sm:text-left text-white"
        >
          Collections
        </Link>
        <Link
          href="/profile/bids"
          className="h4-bold text-center sm:text-left text-white"
        >
          Bids
        </Link>
        <Link
          href="/profile/bought"
          className="h4-bold text-center sm:text-left text-white"
        >
          Bought
        </Link>
      </div>

      <h3 className="h3-bold text-white my-12 px-2">
        Here are your created Auctions
      </h3>

      <OwnerCollection
        data={userAuctions}
        emptyTitle="No collections at the moment"
        emptyStateSubtext="Come back later"
        collectionType="Auction_Created"
        limit={24}
        page={1}
        totalPages={2}
      />
    </section>
  );
}
