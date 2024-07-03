import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./detailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./cusinesSection";
import Mensection from "./mensection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Resturant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    resturantName: z.string({
        required_error: "Resturant Name is Requeired!",
    }),
    city: z.string({
        required_error: "City is Requeired!",
    }),
    country: z.string({
        required_error: "Country is Requeired!",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "deliveryPrice is Requeired!",
        invalid_type_error: "must be a valid number",
    }),
    estimateDeliveryTime: z.coerce.number({
        required_error: "estimateDeliveryTime is Requeired!",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select atleast one item!",
    }),
    menueItems: z.array(z.object({
        name: z.string().min(1, "Name is Requeired!"),
        price: z.coerce.number().min(1, "Price is Requeired!"),
    })),
    imageFile: z.instanceof(File, { message: "Image is Requeired!" }),
})

type ResturantFormData = z.infer<typeof formSchema>

type Props = {
    resturant?: Resturant;//chack if this is correct 
  onSave: (resturantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageResturantForm = ({onSave, isLoading, resturant}: Props) => {
  const form = useForm<ResturantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        cuisines: [],
        menueItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!resturant) {
        return;
    }
    const deliveryPriceFormatted = parseInt((resturant.deliveryPrice / 100).toFixed(2));
    const menuItemsFormatted = resturant.menueItems.map((item) => ({
        ...item,
        price: parseInt((item.price / 100).toFixed(2)),    
    }));
    const updatedResturant = {
        ...resturant,
        deliveryPrice: deliveryPriceFormatted,
        menueItems: menuItemsFormatted,
    }
    form.reset(updatedResturant);
}, [form, resturant]);

  const onSubmit = (FormDataJson: ResturantFormData)=> {
        const formData = new FormData();

        formData.append("resturantName", FormDataJson.resturantName);
        formData.append("city", FormDataJson.city);
        formData.append("country", FormDataJson.country);

        formData.append("deliveryPrice", (FormDataJson.deliveryPrice * 100).toString());

        formData.append("estimateDeliveryTime", FormDataJson.estimateDeliveryTime.toString());

        FormDataJson.cuisines.forEach((cuisine, index)=>{
            formData.append(`cuisines[${index}]`, cuisine);
        })

        FormDataJson.menueItems.forEach((menueItem, index)=>{
            formData.append(`menueItems[${index}][name]`, menueItem.name);
            formData.append(`menueItems[${index}][price]`, (menueItem.price * 100).toString());
        })

        formData.append(`imageFile`, FormDataJson.imageFile);
        onSave(formData);
  }

  return(
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
            <DetailsSection/>
            <Separator/>
            <CuisinesSection/>
            <Separator/>
            <Mensection/>
            <Separator/>
            <ImageSection/>
            {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
        </form>
    </Form>
  )
}

export default ManageResturantForm;