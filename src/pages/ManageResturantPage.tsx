import { useCreateMyResturant, useGetMyResturant, useUpdateResturant } from "@/api/myResturantApi";
import ManageResturantForm from "@/forms/manage-Resturant-Form/ManageResturantForm";

const ManageResturantPage = () => {
  const { createResturant, isLoading: isCreatedLoading } = useCreateMyResturant();
  const { resturant } = useGetMyResturant();
  const { updateResturant, isLoading: isUpdateLoading } = useUpdateResturant();

  const isEditing = !!resturant;

  return <ManageResturantForm resturant={resturant} onSave={isEditing ? updateResturant : createResturant} isLoading={isCreatedLoading || isUpdateLoading}/>;

}

export default ManageResturantPage;