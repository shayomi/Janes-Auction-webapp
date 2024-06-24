import mongoose, { Document, model, models, Schema } from "mongoose";

export interface ICollection extends Document {
  title: string;
  description?: string;
  uploadedAt?: Date;
  imageUrl: string;
  auctionStartDate?: Date;
  auctionEndDate?: Date;
  price?: string;
  category: { _id: string; name: string };
  owner?: { _id: string; firstName: string; lastName: string };
}

const CollectionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  auctionStartDate: { type: Date, default: Date.now },
  auctionEndDate: { type: Date, default: Date.now },
  price: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "category" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);

export default Collection;
