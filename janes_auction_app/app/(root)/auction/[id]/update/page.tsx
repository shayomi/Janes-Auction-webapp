import AuctionForm from "@/components/shared/AuctionForm";
import { getAuctionById } from "@/lib/actions/auction.action";
import { auth } from "@clerk/nextjs/server";

type UpdateAuctionProps = {
  params: {
    id: string;
  };
};

const UpdateAuction = async ({ params: { id } }: UpdateAuctionProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const auction = await getAuctionById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <AuctionForm
          type="Update"
          auction={auction}
          auctionId={auction._id}
          userId={userId}
        />
      </div>
    </>
  );
};

export default UpdateAuction;
