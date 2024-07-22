import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getAuctionById,
  getRelatedAuctionByCategory,
} from "@/lib/actions/auction.action";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const AuctionDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const auction = await getAuctionById(id);

  const relatedAuction = await getRelatedAuctionByCategory({
    categoryId: auction.category._id,
    auctionId: auction._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl mt-12 px-8 sm:px-12">
          <Image
            src={auction.imageUrl}
            alt="hero image"
            width={500}
            height={500}
            className="max-h-[500px] min-h-[300px] object-cover object-center rounded-sm"
          />

          <div className="flex w-full flex-col gap-8 py-5 px-0 md:p-5 text-white">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold ">{auction.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3 flex-row ">
                  <span className=" flex flex-row gap-1  items-center rounded-full bg-blue-400 px-5 py-2 text-black">
                    <Image
                      src="/icons/dollar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                    />
                    <p className="p-bold-20 ">{auction.price}</p>
                  </span>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {auction.category.name}
                  </p>
                </div>
              </div>
              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 flex flex-row gap-2">
                Owner:{" "}
                <span className="text-primary-500 text-red-300">
                  {auction.owner.firstName} {auction.owner.lastName}
                </span>
              </p>
            </div>

            <CheckoutButton auction={auction} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 gap-x-3 gap-y-1 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(auction.auctionStartDate).dateOnly} -{" "}
                    {formatDateTime(auction.auctionStartDate).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(auction.auctionEndDate).dateOnly} -{" "}
                    {formatDateTime(auction.auctionEndDate).timeOnly}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">About this art:</p>
              <p className="p-medium-16 lg:p-regular-18">
                {auction.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h3 className="h3-bold mt-12 text-white">Related Auctions</h3>

        <Collection
          data={relatedAuction?.data}
          emptyTitle="No collections at the moment"
          emptyStateSubtext="Come back later"
          collectionType="All_Auctions"
          limit={5}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default AuctionDetails;
