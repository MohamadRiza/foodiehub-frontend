import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthproviderwithNavigate from './auth/AuthproviderwithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryclient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryclient}>
      <AuthproviderwithNavigate>
      <AppRoutes/>
      <Toaster visibleToasts={1} position='top-right' richColors/>
      </AuthproviderwithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
