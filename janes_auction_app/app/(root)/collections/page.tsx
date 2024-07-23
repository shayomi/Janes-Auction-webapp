import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllAuction } from "@/lib/actions/auction.action";
import { SearchParamProps } from "@/types";
import React from "react";

export default async function Collections({ searchParams }: SearchParamProps) {
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
    <section className="max-w-[1440px] w-full block md:p-12 p-12 mt-12">
      <h3 className="h3-bold text-white">
        Here are some of our exciting collections
      </h3>

      <div className="flex w-full flex-col gap-5 md:flex-row text-white">
        <Search />
        <CategoryFilter />
      </div>

      <Collection
        data={auctions?.data}
        emptyTitle="No collections at the moment"
        emptyStateSubtext="Come back later"
        collectionType="All_Auctions"
        limit={24}
        page={page}
        totalPages={auctions?.totalPages}
      />
    </section>
  );
}
