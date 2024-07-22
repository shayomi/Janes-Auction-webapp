import React from "react";
import Link from "next/link";
import OwnerCollection from "@/components/shared/OwnerCollection";
import { SearchParamProps } from "@/types";
import { IOrder } from "@/lib/database/models/order.model";
import { auth } from "@clerk/nextjs/server";

const TicketPage = async ({ searchParams }: SearchParamProps) => {
  //   const { sessionClaims } = auth();
  //   const userId = sessionClaims?.userId as string;

  //   const ordersPage = Number(searchParams?.ordersPage) || 1;

  //   const orders = await getOrdersByUser({ userId, page: ordersPage });

  //   const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <>
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
          Here are your bidded Auctions
        </h3>
      </section>

      {/* <section className="wrapper my-8">
        <OwnerCollection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}
    </>
  );
};

export default TicketPage;
