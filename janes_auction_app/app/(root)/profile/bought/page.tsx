import React from "react";
import Link from "next/link";

const page = () => {
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
    </section>
  );
};

export default page;
