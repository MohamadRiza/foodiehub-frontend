import {
  useCreateMyResturant,
  useGetMyResturant,
  useGetMyResturantOrders,
  useUpdateResturant,
} from "@/api/myResturantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageResturantForm from "@/forms/manage-Resturant-Form/ManageResturantForm";

const ManageResturantPage = () => {
  const { createResturant, isLoading: isCreatedLoading } = useCreateMyResturant();
  const { resturant } = useGetMyResturant();
  const { updateResturant, isLoading: isUpdateLoading } = useUpdateResturant();
  const { orders } = useGetMyResturantOrders();

  const isEditing = !!resturant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-resturant">Manage Resturant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard key={order._id} order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-resturant">
        <ManageResturantForm
          resturant={resturant}
          onSave={isEditing ? updateResturant : createResturant}
          isLoading={isCreatedLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageResturantPage;
