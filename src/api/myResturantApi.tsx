import { Resturant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyResturant = ()=>{
    const { getAccessTokenSilently } = useAuth0();
    const getMyResturantRequest = async (): Promise<Resturant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/resturant`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        if(!response.ok){
            throw new Error("Failed to get resturant!");
        }
        return response.json();
    }

    const { data: resturant, isLoading } = useQuery("fetchMyResturant", getMyResturantRequest)

    return { resturant, isLoading };
};

export const useCreateMyResturant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyResturantRequest = async(resturantFormData: FormData) :Promise<Resturant[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: resturantFormData,
        });

        if(!response.ok){
            throw new Error("Failed to Create Resturant!");
        }

        return response.json();

    }
    
    const { mutate: createResturant, isLoading, isSuccess, error } = useMutation(createMyResturantRequest);

    if(isSuccess){
        toast.success("Resturant Created!")
    }
    if(error){
        toast.error("Unable to Update Resturant!")
    }
    
    return { createResturant, isLoading };
}
export const useUpdateResturant = ()=>{
    const { getAccessTokenSilently } = useAuth0();

    const updateResturantRequest = async (resturantFormData: FormData): Promise<Resturant> =>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: resturantFormData,
        });
        if(!response){
            throw new Error("Failed to Update Resturant!")
        }
        return response.json();
    }
    const { mutate: updateResturant, isLoading, error, isSuccess } = useMutation(updateResturantRequest);
    if(isSuccess){
        toast.success("Resturant Updated!");
    }
    if(error){
        toast.error("Undable to Update Resturant!");
    }
    return { updateResturant, isLoading }
}