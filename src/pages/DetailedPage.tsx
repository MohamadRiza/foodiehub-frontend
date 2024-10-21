import { useGetResturant } from "@/api/ResturantApi";
import MenuItem from "@/components/MenuItem";
import ResturantInfo from "@/components/ResturantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailedPage = () => {
  const { resturantId } = useParams();
  const { resturant, isLoading } = useGetResturant(resturantId);

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
            <ResturantInfo resturant={resturant}/>
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {resturant.menueItems.map((menueItem)=>(
              <MenuItem menuItems={menueItem}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;
