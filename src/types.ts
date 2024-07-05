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
  }
  
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
  }

  export type ResturantSearchResponse = {
    data: Resturant[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    }
  }