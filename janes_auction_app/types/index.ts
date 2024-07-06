// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== Auction PARAMS
export type CreateAuctionParams = {
  userId: string;
  auction: {
    title: string;
    description: string;
    imageUrl: string;
    auctionStartDate: Date;
    auctionEndDate: Date;
    categoryId: string;
    price: string;
  };
  path: string;
};

export type UpdateAuctionParams = {
  userId: string;
  auction: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    auctionStartDate: Date;
    auctionEndDate: Date;
    categoryId: string;
    price: string;
  };
  path: string;
};

export type DeleteAuctionParams = {
  auctionId: string;
  path: string;
};

export type GetAllAuctionParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetAuctionByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedAuctionByCategoryParams = {
  categoryId: string;
  auctionId: string;
  limit?: number;
  page: number | string;
};

export type Auction = {
  _id: string;
  title: string;
  description: string;
  price: string;

  imageUrl: string;

  auctionStartDate: Date;
  auctionEndDate: Date;
  url: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  auctionTitle: string;
  auctionId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  auctionId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByAuctionParams = {
  auctionId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  auctionId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
