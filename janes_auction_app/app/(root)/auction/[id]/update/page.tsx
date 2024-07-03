import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const UpdateAuction = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <main className="max-w-[1440px] w-full ">
      <section>
        <h3 className="h3-bold text-center sm:text-left text-white  p-12">
          Update Auction
        </h3>
      </section>

      <div className="my-8">
        <EventForm userId={userId} type="Update" />
      </div>
    </main>
  );
};

export default UpdateAuction;
