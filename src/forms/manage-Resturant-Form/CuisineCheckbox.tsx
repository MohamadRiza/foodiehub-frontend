import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    cuisines: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = ({ cuisines, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
        <FormControl>
            <Checkbox className="bg-white" checked={field.value.includes(cuisines)} onCheckedChange={(chacked)=>{
                if(chacked){
                    field.onChange([...field.value, cuisines]);
                }
                else{
                    field.onChange(
                        field.value.filter((value: string) => value !== cuisines)
                    );
                }
            }}/>
        </FormControl>
        <FormLabel className="text-sm font-normal">{cuisines}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox;