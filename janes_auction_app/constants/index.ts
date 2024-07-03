export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Auction",
    route: "/auction/create",
  },
  {
    label: "Collections",
    route: "/collections",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  auctionStartDate: new Date(),
  auctionEndDate: new Date(),
  categoryId: "",
  price: "",
};
