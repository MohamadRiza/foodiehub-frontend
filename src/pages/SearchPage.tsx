import { useSearchResturants } from "@/api/ResturantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchResturants(city);

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
          <SearchResultInfo total={results.pagination.page} city={city}/>
          {results.data.map((resturant)=>(
            <SearchResultCard resturant={resturant}/>
          ))}
        </div>
      </div>    
  )

}

export default SearchPage;