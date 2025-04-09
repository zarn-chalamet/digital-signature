import toast from "react-hot-toast"
import api from "../utils/api"

export const getUserLists = async (accessToken) => {
    try {
        const { data } = await api.post('/api/admin/users-list', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return data.users
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

export const createNewUser = async (newUser) => {
    try {
        const { data } = await api.post('/api/admin/add-user', newUser, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data.user
    } catch (err) {
        console.error("Error creating user:", err);
        toast.error('Something went wrong')
    }
}

export const editUser = async ({ accessToken, userId, userData }) => {
    try {
        const { data } = await api.post(`/api/admin/update-user/${userId}`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return data.user

    } catch (err) {
        console.error("Error updating user:", err);
        toast.error('Something went wrong')
    }
}