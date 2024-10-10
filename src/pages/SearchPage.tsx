import { useSearchResturants } from "@/api/ResturantApi";
import PaginationSector from "@/components/paginationSector";
import SearchBar, { SerchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
}

const SearchPage = () => {
  const { city } = useParams();
  const [SearchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  })
  const { results, isLoading } = useSearchResturants(SearchState, city);

  const setPage = (page: number) => {
    setSearchState((prevState)=>({
      ...prevState,
      page,
    }))
  }

  const setSearchQuery = (searchFormData: SerchForm) => {
    setSearchState((prevState)=> ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  }

  const resetSearch= () => {
    setSearchState((prevState)=> ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  }

  if(isLoading){
    <span>Loading...</span>
  }

  if(!results?.data || !city){
    return <span>No Result Found!</span>;
  }

  return(
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cusines-list">
          insert Cuisines Here :)
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar searchQuery={SearchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search By Cuisines or Restuarant Name" onReset={resetSearch}/>
          <SearchResultInfo total={results.pagination.total} city={city}/>
          {results.data.map((resturant)=>(
            <SearchResultCard resturant={resturant}/>
          ))}
          <PaginationSector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
        </div>
      </div>    
  )

}

export default SearchPage;