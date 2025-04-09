import toast from "react-hot-toast"
import api from "../utils/api"

export const getUserLists = async (accessToken) => {
    try {
        const { data } = await api.post('/api/admin/users-list', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data
    }
    catch (err) {
        toast.err(err.message)
        console.error(err.message)
    }
}

export const toggleUserStatus = async ({ accessToken, userId }) => {
    try {
        await api.post('/api/admin/toggle-restricted', { userId }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    }
    catch (err) {
        toast.err(err.message)
        console.error(err.message)
    }
}

export const deleteUser = async ({ accessToken, userId }) => {
    try {
        await api.post(`/api/admin/delete-user/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (err) {
        toast.err(err.message)
        console.error("Delete user failed:", err);
    }
}