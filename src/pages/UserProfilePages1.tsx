import { useUpdateMyUser, usergetMyUser } from "@/api/myUserApi";
import UserProfileForm from "@/forms/user-profile-form/userprofileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = usergetMyUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if(isGetLoading){
    return <span>Loading...</span>
  }
  if(!currentUser){
    return <span>Unable to Load user profile</span>
  }

  return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>;
};

export default UserProfilePage;
