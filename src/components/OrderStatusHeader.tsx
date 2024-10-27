import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/Order-Status-Config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.resturant.estimateDeliveryTime
    );
    
    const hours = created.getHours();
    const miniutes = created.getMinutes();

    const paddedMiniutes = miniutes < 10 ? `0${miniutes}` : miniutes;

    return `${hours}:${paddedMiniutes}`;

  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o)=> o.value === order.status) || ORDER_STATUS[0]
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
    </>
  );
};

export default OrderStatusHeader;
