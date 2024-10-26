import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetResturant } from "@/api/ResturantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummery from "@/components/OrderSummery";
import ResturantInfo from "@/components/ResturantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/userprofileForm";
import { MenuItems as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailedPage = () => {
  const { resturantId } = useParams();
  const { resturant, isLoading } = useGetResturant(resturantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`CartItems-${resturantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `CartItems-${resturantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `CartItems-${resturantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!resturant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menueitemsId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      resturantId: resturant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !resturant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={resturant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <ResturantInfo resturant={resturant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {resturant.menueItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItems={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummery
              resturant={resturant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onChackout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;








/*
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetResturant } from "@/api/ResturantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummery from "@/components/OrderSummery";
import ResturantInfo from "@/components/ResturantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/userprofileForm";
import { MenuItems as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  //for add to cart
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailedPage = () => {
  const { resturantId } = useParams();
  const { resturant, isLoading } = useGetResturant(resturantId);
  const { createCheckoutSession, isLoading: isChackoutLoading } =
    useCreateCheckoutSession();

  const [CartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`CartItems-${resturantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }); //for add to cart

  const addToCart = (menueItem: MenuItemType) => {
    //chack again menueitem ../types or @/types
    setCartItems((prevCartItems) => {
      //1. chack if the item is already in the cart?
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menueItem._id
      ); //must chack here cartItem/CartItems

      let updateCartItems;

      //2. if item is in cart, update the quentity
      if (existingCartItem) {
        updateCartItems = prevCartItems.map((CartItem) =>
          CartItem._id === menueItem._id
            ? { ...CartItem, quantity: CartItem.quantity + 1 }
            : CartItem
        );
      } else {
        updateCartItems = [
          ...prevCartItems,
          {
            _id: menueItem._id,
            name: menueItem.name,
            price: menueItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `CartItems-${resturantId}`,
        JSON.stringify(updateCartItems)
      );

      //3. if item is not in the cart, add it as a new item
      return updateCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    //chack cartitem
    setCartItems((prevCartItems) => {
      const updateCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      return updateCartItems; //also chack it updatecartitem
    });
  };

  const onChackout = async (userFormData: UserFormData) => {
    //chack here
    if(!resturant){
      return;
    }
    
    const CheckoutData = {
      CartItems: CartItems.map((cartItem)=> ({
        menueitemsId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),        
      })),
      resturantId: resturant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string
      }
    }
    const data = await createCheckoutSession(CheckoutData);
    window.location.href = data.url;
  };

  if (isLoading || !resturant) {
    return "Loading...";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={resturant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <ResturantInfo resturant={resturant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {resturant.menueItems.map((menueItem) => (
            <MenuItem
              menuItems={menueItem}
              addToCart={() => addToCart(menueItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummery
              resturant={resturant}
              cartItems={CartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={CartItems.length === 0}
                onChackout={onChackout}
                isLoading={isChackoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
//orginal
export default DetailedPage;

*/
