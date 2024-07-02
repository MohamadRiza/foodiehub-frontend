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

type resturantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (resturantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageResturantForm = ({onSave, isLoading}: Props) => {
  const form = useForm<resturantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        cuisines: [],
        menueItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (FormDataJson: resturantFormData)=> {
    // TODO  - convert ........
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