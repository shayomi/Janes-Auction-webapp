import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: string;
  auction: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  auctionTitle: string;
  auctionId: string;
  buyer: string;
};

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
