import { useCreateMyResturant, useGetMyResturant } from "@/api/myResturantApi";
import ManageResturantForm from "@/forms/manage-Resturant-Form/ManageResturantForm";

const ManageResturantPage = () => {
  const { createResturant, isLoading } = useCreateMyResturant();
  const { resturant } = useGetMyResturant();
  return <ManageResturantForm resturant={resturant} onSave={createResturant} isLoading={isLoading}/>;

}

export default ManageResturantPage;