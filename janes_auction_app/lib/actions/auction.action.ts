"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Auction from "../database/models/auction.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";

import {
  CreateAuctionParams,
  UpdateAuctionParams,
  DeleteAuctionParams,
  GetAllAuctionParams,
  GetAuctionByUserParams,
  GetRelatedAuctionByCategoryParams,
} from "@/types";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateAuction = (query: any) => {
  return query
    .populate({
      path: "owner",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export async function createAuction({
  userId,
  auction,
  path,
}: CreateAuctionParams) {
  try {
    await connectToDatabase();

    const owner = await User.findById(userId);
    if (!owner) throw new Error("Owner not found");

    const newAuction = await Auction.create({
      ...auction,
      category: auction.categoryId,
      owner: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newAuction));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getAuctionById(auctionId: string) {
  try {
    await connectToDatabase();

    const event = await populateAuction(Auction.findById(auctionId));

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateEvent({
  userId,
  auction,
  path,
}: UpdateAuctionParams) {
  try {
    await connectToDatabase();

    const auctionToUpdate = await Auction.findById(auction._id);
    if (
      !auctionToUpdate ||
      auctionToUpdate.organizer.toHexString() !== userId
    ) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedAuction = await Auction.findByIdAndUpdate(
      auction._id,
      { ...auction, category: auction.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedAuction));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteAuction({ auctionId, path }: DeleteAuctionParams) {
  try {
    await connectToDatabase();

    const deletedAuction = await Auction.findByIdAndDelete(auctionId);
    if (deletedAuction) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ALL EVENTS
export async function getAllAuction({
  query,
  limit = 6,
  page,
  category,
}: GetAllAuctionParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const auctionsQuery = Auction.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const auctions = await populateAuction(auctionsQuery);
    const auctionsCount = await Auction.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(auctions)),
      totalPages: Math.ceil(auctionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET EVENTS BY ORGANIZER
export async function getAuctionByUser({
  userId,
  limit = 6,
  page,
}: GetAuctionByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const auctionsQuery = Auction.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const auctions = await populateAuction(auctionsQuery);
    const auctionsCount = await Auction.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(auctions)),
      totalPages: Math.ceil(auctionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedAuctionByCategory({
  categoryId,
  auctionId,
  limit = 3,
  page = 1,
}: GetRelatedAuctionByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: auctionId } }],
    };

    const auctionsQuery = Auction.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const auctions = await populateAuction(auctionsQuery);
    const auctionsCount = await Auction.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(auctions)),
      totalPages: Math.ceil(auctionsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
