import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        token,setToken,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;