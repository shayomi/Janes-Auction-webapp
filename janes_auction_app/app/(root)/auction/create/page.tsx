import AuctionForm from "@/components/shared/AuctionForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const CreateAuction = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <main className="max-w-[1440px] w-full ">
      <section>
        <h3 className="h3-bold text-center sm:text-left text-white  p-12">
          Create Auction
        </h3>
      </section>

      <div className="my-8 px-12">
        <AuctionForm userId={userId} type="Create" />
      </div>
    </main>
  );
};

export default CreateAuction;
