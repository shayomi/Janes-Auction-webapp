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

// ====== EVENT PARAMS
export type CreateCollectionParams = {
  userId: string;
  event: {
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

export type UpdateCollectionParams = {
  userId: string;
  event: {
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

export type DeleteCollectionParams = {
  collectionId: string;
  path: string;
};

export type GetAllCollectionParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetCollectionByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedCollectionByCategoryParams = {
  categoryId: string;
  collectionId: string;
  limit?: number;
  page: number | string;
};

export type Collection = {
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
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
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
