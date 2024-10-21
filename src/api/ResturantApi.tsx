import { SearchState } from "@/pages/SearchPage";
import { Resturant, ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetResturant = (resturantId?: string) => {
  const getResturantByIdRequest = async (): Promise<Resturant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/resturant/${resturantId}`
    ); //chack here

    if (!response.ok) {
      throw new Error("Failed to get resturant");
    }
    return response.json();
  };

  const { data: resturant, isLoading } = useQuery(
    "fetchResturant",
    getResturantByIdRequest,
    {
      enabled: !!resturantId,
    }
  );

  return { resturant, isLoading };
};

export const useSearchResturants = (
  SearchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<ResturantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", SearchState.searchQuery);
    params.set("page", SearchState.page.toString());
    params.set("selectedCuisines", SearchState.selectedCuisines.join(","));
    params.set("sortOption", SearchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/my/resturant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get resturant!");
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchResturants", SearchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  }; //orginal
};
