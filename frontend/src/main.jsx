import {
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import router from "./router";
import './index.css'
import { ToastContainer } from "react-toastify"
import { AppContextProvider } from "./context-api/AppContext"

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ToastContainer/>
    <RouterProvider router={router} />
  </AppContextProvider>
)
