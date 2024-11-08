//import { useCreateMyUser } from "@/api/myUserApi";
import { AppState, Auth0Provider, } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
}

const AuthproviderwithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirecturi = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if(!domain || !clientId || !redirecturi || !audience){
    throw new Error("Unable to initialize auth");
  }

  const onRedirectCallback = async (appState?: AppState) => {
    
    navigate(appState?.returnTo || "/auth-callback");
  }

  return(
    <Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      authorizationParams={{redirect_uri: redirecturi,
        audience,
      }} 
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthproviderwithNavigate;