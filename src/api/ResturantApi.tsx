import { SearchState } from "@/pages/SearchPage";
import { ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchResturants = (SearchState: SearchState, city?: string) => {
    const createSearchRequest = async(): Promise<ResturantSearchResponse> =>{
        const params = new URLSearchParams();
        params.set("searchQuery", SearchState.searchQuery);
        params.set("page", SearchState.page.toString());
        
        const response = await fetch(`${API_BASE_URL}/api/my/resturant/search/${city}?${params.toString()}`);

        if(!response.ok){
            throw new Error("Failed to get resturant!")
        }
        return response.json();
    };

    const { data: results, isLoading } = useQuery(["searchResturants", SearchState], createSearchRequest, { enabled: !!city });

    return {
        results,
        isLoading
    }

}