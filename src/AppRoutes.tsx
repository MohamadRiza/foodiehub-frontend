import { Navigate, Route, Routes } from "react-router-dom" 
import Layout from "./layouts/layout";
import Homepage from "./pages/Homepage";
import Authcallbackpage from "./pages/Authcallbackpage";
import UserProfilePages from "./pages/UserProfilePages1";
import ProtectedRouter from "./auth/ProtectedRouter";


const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><Homepage/></Layout>}/>
            <Route path="/auth-callback" element={<Authcallbackpage />} />
            <Route element={<ProtectedRouter/>}>
            <Route path="/user-profile" element={<Layout><UserProfilePages/></Layout>}/>
            </Route>
            
           
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes;