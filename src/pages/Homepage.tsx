import landingimage from "../assets/landing.png"
import appdownload from "../assets/appDownload.png"
import SearchBar, { SerchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SerchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return(   
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">Tuck into takeway today</h1>
            <span className="text-xl">Food is Just Click Away</span>
            <SearchBar placeHolder="Search By City or Town" onSubmit={handleSearchSubmit}/>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingimage}/>
        
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
                Order Takeaway even faster
            </span>
            <span>
                Download the FoodieHub App for faster ordering and personalised recommendations
            </span>
            <img src={appdownload}/>
         </div>
        </div>
    </div>
  )
}

export default Homepage;