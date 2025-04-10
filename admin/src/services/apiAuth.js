import toast from "react-hot-toast"
import api from "@/utils/api"

export const logInUser = async ({ email, password }) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const { data } = await api.post("/api/admin/login", { email, password })
    
        return data
    }
    catch (err) {
        console.log('Error: ', err)
        toast.error(err.response.data.message)
    }
}