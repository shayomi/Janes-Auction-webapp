import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import OwnerCollection from "@/components/shared/OwnerCollection";
import Collection from "@/components/shared/Collection";

const page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const orders = await getOrdersByUser({ userId, page: 1 });
  const orderedAuctions =
    orders?.data.map((order: IOrder) => order.auction) || [];

  console.log(orderedAuctions);

  return (
    <section className="max-w-[1440px] w-full flex flex-col md:px-12 md:py-0 p-12 mt-12">
      <div className=" flex items-center justify-center sm:justify-between">
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
      <h3 className="h3-bold text-white my-12">
        Here are your bought Collections
      </h3>

      <Collection
        data={orderedAuctions}
        emptyTitle="No collections purchased at the moment"
        emptyStateSubtext="Come back later"
        collectionType="My_Auctions"
        limit={24}
        page={1}
        totalPages={2}
      />
    </section>
  );
};

export default page;
