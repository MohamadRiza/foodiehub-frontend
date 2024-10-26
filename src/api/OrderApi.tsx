import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query"; //check this ref from?
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type checkoutSessionRequest = {
    cartItems: {
      menueitemsId: string; //chack here
      name: string;
      quantity: string;
    }[];
    deliveryDetails: {
      email: string;
      name: string;
      addressLine1: string;
      city: string;
    };
    resturantId: string;
  };

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutSessionRequest: checkoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response) {
      throw new Error("unable to create checkout session");
    }

    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if(error){
    toast.error(error.toString())
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  }
};
