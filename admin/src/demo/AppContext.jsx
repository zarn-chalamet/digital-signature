/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [users,setUsers] = useState([]);
    const [templates,setTemplates] = useState([]);

    const getUsersList = async () => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/users-list",{},{headers:{token}})

            if(data.success){
                setUsers(data.users);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleRestricted = async (userId) => {
        try {
            const {data} = await axios.post(backendUrl+"/api/admin/toggle-restricted",{userId},{headers:{token}})

            if(data.success){
                toast.success(data.message)
                getUsersList();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllTemplates = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/admin/templates")

            if(data.success){
                setTemplates(data.templates)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        token,setToken,
        backendUrl,
        users,getUsersList,
        toggleRestricted,
        templates,getAllTemplates
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;