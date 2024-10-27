export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItems = {
  _id: string;
  name: string;
  price: number;
};

export type Resturant = {
  _id: string;
  user: string;
  resturantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimateDeliveryTime: number;
  cuisines: string[];
  menueItems: MenuItems[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  resturant: Resturant;
  user: User;
  cartitems: {
    menueItemsId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmmount: number;
  status: OrderStatus;
  createdAt: string;
  resturantId: string;
};

export type ResturantSearchResponse = {
  data: Resturant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
