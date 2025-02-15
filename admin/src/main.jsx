import { createRoot } from 'react-dom/client'
import './index.css'
import AppContextProvider from "./context-api/AppContext"
import {ToastContainer} from "react-toastify"
import router from './router';
import {
  RouterProvider,
} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ToastContainer/>
    <RouterProvider router={router} /> 
  </AppContextProvider>
)
