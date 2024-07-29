"use server";

import Stripe from "stripe";
import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByAuctionParams,
  GetOrdersByUserParams,
} from "@/types";
import { redirect } from "next/navigation";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import Auction from "../database/models/auction.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.auctionTitle,
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        auctionId: order.auctionId,
        buyerId: order.buyerId,
      },

      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      auction: order.auctionId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

// GET ORDERS BY AUCTION
export async function getOrdersByAuction({
  searchString,
  auctionId,
}: GetOrdersByAuctionParams) {
  try {
    await connectToDatabase();

    if (!auctionId) throw new Error("Auction ID is required");
    const auctionObjectId = new ObjectId(auctionId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "auctions",
          localField: "auction",
          foreignField: "_id",
          as: "auction",
        },
      },
      {
        $unwind: "$auction",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          auctionTitle: "$auction.title",
          auctionId: "$auction._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { auctionId: auctionObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("auction._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "auction",
        model: Auction,
        populate: {
          path: "owner",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await Order.distinct("auction._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
