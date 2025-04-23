import { useMutation } from "@tanstack/react-query"
import { logInUser as logInUserApi } from '@/services/apiAuth'
import toast from "react-hot-toast"
import useAuth from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
    const { dispatch } = useAuth()
    const navigate = useNavigate()

    const { mutate: logInUser, isPending: isLoggingIn } = useMutation({
        mutationFn: ({ email, password }) => logInUserApi({ email, password }),
        onSuccess: (data) => {
            toast.success('Logged in successfully.')
            localStorage.setItem('accessToken', data.accessToken)
            dispatch({ type: 'auth/login', payload: data.accessToken })
            navigate('/', { replace: true })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    })

    return { logInUser, isLoggingIn }
}

export default useLogin