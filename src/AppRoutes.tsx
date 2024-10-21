import { Navigate, Route, Routes } from "react-router-dom" 
import Layout from "./layouts/layout";
import Homepage from "./pages/Homepage";
import Authcallbackpage from "./pages/Authcallbackpage";
import UserProfilePages from "./pages/UserProfilePages1";
import ProtectedRouter from "./auth/ProtectedRouter";
import ManageResturantPage from "./pages/ManageResturantPage";
import SearchPage from "./pages/SearchPage";
import DetailedPage from "./pages/DetailedPage";


const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><Homepage/></Layout>}/>
            <Route path="/auth-callback" element={<Authcallbackpage />} />
            <Route path="/search/:city" element={<Layout showHero={false}><SearchPage/></Layout>}/>
            <Route path="/detail/:resturantId" element={<Layout showHero={false}><DetailedPage/></Layout>}/>
            <Route element={<ProtectedRouter/>}>
            <Route path="/user-profile" element={<Layout><UserProfilePages/></Layout>}/>
            <Route path="/manage-resturant" element={<Layout><ManageResturantPage/></Layout>}/>
            </Route>
            
           
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;