import axios from "axios"
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();


export const AppContextProvider = ({children}) => {

    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn ,setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);
    const [templatesByCurrentUser,setTemplatesByCurrentUser] = useState([]);
    const [templateById,setTemplateById] = useState("");
    const [otherUsers,setOtherUsers] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [requestsByOthers,setRequestsByOthers] = useState([]);


    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/is-auth");
            if(data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/user-data');
            console.log("userdata from context");
            console.log(data)
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getTemplatesByCurrentUser = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/templates");
            console.log(data)
            if(data.success){
                setTemplatesByCurrentUser(data.templates)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getTemplateById = async (templateId) => {
        try {
            const {data} = await axios.get(backendUrl+`/api/auth/templates/${templateId}`);
            if(data.success){
                setTemplateById(data.template);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getOtherUsersList = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/users");
            console.log(data)
            if(data.success){
                setOtherUsers(data.users);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getMyRequests = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/my-requests");
            console.log(data)
            if(data.success){
                setMyRequests(data.requests);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getRequestsByOthers = async () => {
        try {
            const {data} = await axios.get(backendUrl+"/api/auth/requests-by-others");
            console.log(data)
            if(data.success){
                setRequestsByOthers(data.requests);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        getAuthState()
    },[])

    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,
        templatesByCurrentUser,getTemplatesByCurrentUser,
        templateById,getTemplateById,
        otherUsers,getOtherUsersList,
        myRequests,getMyRequests,
        requestsByOthers,getRequestsByOthers
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}