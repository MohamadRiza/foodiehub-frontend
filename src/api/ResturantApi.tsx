import { ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchResturants = (city?: string) => {
    const createSearchRequest = async(): Promise<ResturantSearchResponse> =>{
        const response = await fetch(`${API_BASE_URL}/api/my/resturant/search/${city}`);

        if(!response.ok){
            throw new Error("Failed to get resturant!")
        }
        return response.json();
    };

    const { data: results, isLoading } = useQuery(["searchResturants"], createSearchRequest, { enabled: !!city });

    return {
        results,
        isLoading
    }

}