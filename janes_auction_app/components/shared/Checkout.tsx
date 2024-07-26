import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IAuction } from "@/lib/database/models/auction.model";
import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.action";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  auction,
  userId,
}: {
  auction: IAuction;
  userId: string;
}) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      auctionTitle: auction.title,
      auctionId: auction._id,
      price: auction.price,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        Buy Ticket
      </Button>
    </form>
  );
};

export default Checkout;
