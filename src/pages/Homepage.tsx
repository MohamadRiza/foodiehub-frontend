import landingimage from "../assets/landing.png"
import appdownload from "../assets/appDownload.png"


const Homepage = () => {
  return(
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">Tuck into takeway today</h1>
            <span className="text-xl">Food is Just Click Away</span>
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