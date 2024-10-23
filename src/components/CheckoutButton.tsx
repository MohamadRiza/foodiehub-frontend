import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/userprofileForm";
import { usergetMyUser } from "@/api/myUserApi";

type Props = {
    onChackout: (useFormData: UserFormData)=> void;
    disabled: boolean;
}

const CheckoutButton = ({ onChackout, disabled }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = usergetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to Checkout
      </Button>
    );
  }
  if(isAuthLoading || !currentUser){
    return (
        <LoadingButton/>
    )
  }
  
  return(
    <Dialog>
        <DialogTrigger asChild>
            <Button disabled={disabled} className="bg-orange-500 flex-1">
                Go to Checkout
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <UserProfileForm currentUser={currentUser} onSave={onChackout} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to Payment"/>
        </DialogContent>
    </Dialog>
  )

};

export default CheckoutButton;
