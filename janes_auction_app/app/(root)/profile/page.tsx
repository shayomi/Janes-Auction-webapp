import CategoryFilter from "@/components/shared/CategoryFilter";
import OwnerCollection from "@/components/shared/OwnerCollection";
import Search from "@/components/shared/Search";
import { getAllAuction } from "@/lib/actions/auction.action";
import { SearchParamProps } from "@/types";
import React from "react";

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

  return (
    <section className="max-w-[1440px] w-full flex flex-col md:p-12 p-12 mt-12">
      <h2 className="text-lg text-white">My Collections</h2>

      {/* <div className="flex w-full flex-col gap-5 md:flex-row text-white">
        <Search />
        <CategoryFilter />
      </div> */}

      <OwnerCollection
        data={auctions?.data}
        emptyTitle="No collections at the moment"
        emptyStateSubtext="Come back later"
        collectionType="My_Auctions"
        limit={24}
        page={1}
        totalPages={2}
      />
    </section>
  );
}
