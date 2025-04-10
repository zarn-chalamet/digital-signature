import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleUserStatus } from "@/services/apiUsers"
import toast from "react-hot-toast"
import useAuth from "@/hooks/useAuth"

const useToggleStatus = () => {
    const { accessToken } = useAuth()
    const queryClient = useQueryClient()

    const { mutate: toggleStatus, isPending: isToggling } = useMutation({
        mutationFn: (userId) => toggleUserStatus({ accessToken, userId }),
        onSuccess: () => {
            toast.success("User status updated")
            queryClient.invalidateQueries({ queryKey: ['user-lists'] })
        },
        onError: () => {
            toast.error("Failed to update user status")
        }
    })

    return { toggleStatus, isToggling }
}

export default useToggleStatus