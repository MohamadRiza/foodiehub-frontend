import { CartItem } from "@/pages/DetailedPage";
import { Resturant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  resturant: Resturant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem)=> void;
}

const OrderSummery = ({ resturant, cartItems, removeFromCart }: Props) => {
  
  // Ensure the prices are numbers to avoid concatenation issues
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce((total, cartItem) => {
      return total + (Number(cartItem.price) * cartItem.quantity); // Explicit conversion to Number
    }, 0);
    
    const deliveryPrice = Number(resturant.deliveryPrice); // Convert delivery price to a number
    
    const totalWithDelivery = totalInPence + deliveryPrice; // Ensure it's numeric addition, not string concatenation

    return (totalWithDelivery / 100).toFixed(2); // Return the result in the correct currency format
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span> {/* Display the total cost */}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash className="cursor-pointer" color="red" size={20} onClick={()=> removeFromCart(item)}/>
              ${((Number(item.price) * item.quantity) / 100).toFixed(2)} {/* Ensure item price is treated as a number */}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(Number(resturant.deliveryPrice) / 100).toFixed(2)}</span> {/* Ensure delivery price is treated as a number */}
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummery;


/*import { CartItem } from "@/pages/DetailedPage";
import { Resturant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type Props = {
  resturant: Resturant;
  cartItems: CartItem[];
}

const OrderSummery = ({resturant, cartItems}: Props) => {
    
    const getTotalCost = ()=>{
      const totalInPence = cartItems.reduce((total, cartItem)=> total + cartItem.price * cartItem.quantity, 0)//chack here cartItem/cartItems
    
      const totalWithDelivery = totalInPence + resturant.deliveryPrice

      return (totalWithDelivery / 100).toFixed(2);

    }

    return(
    <>
        <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                <span>Your Order</span>
                <span>${getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            {cartItems.map((item)=>(
                <div className="flex justify-between">
                    <span>
                        <Badge variant="outline" className="mr-2">
                        {item.quantity}
                        </Badge>
                        {item.name}
                    </span>
                    <span className="flex items-center gap-1">
                    ${((item.price * item.quantity) / 100 ).toFixed(2)}
                    </span>
                </div>
            ))}
            <Separator/>
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>${(resturant.deliveryPrice / 100).toFixed(2)}</span>
            </div>
            <Separator/>
        </CardContent>
    </>
  )
}
//orginal
export default OrderSummery; */