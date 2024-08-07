"use client";

import { IAuction } from "@/lib/database/models/auction.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

const CheckoutButton = ({ auction }: { auction: IAuction }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const auctionEndDate = auction.auctionEndDate
    ? new Date(auction.auctionEndDate)
    : null;
  const hasAuctionFinished = auctionEndDate
    ? auctionEndDate < new Date()
    : false;

  return (
    <div className="flex items-center gap-3">
      {hasAuctionFinished ? (
        <p className="p-2 text-red-400">Sorry, Auctions are closed.</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Bid now</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout auction={auction} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
