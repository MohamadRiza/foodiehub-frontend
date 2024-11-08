import { MenuItems } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItems: MenuItems;
  addToCart: () => void;
};

const MenuItem = ({ menuItems, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItems.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItems.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
