import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { z } from "zod"
import { cn } from "../../utils/cn"
import { useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import api from "../../utils/api"

const backendUrl = import.meta.env.VITE_BACKEND_URL

const FormFieldsSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email format" }),
    password: z.string()
        .min(1, { message: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
})

export default function LoginForm() {
    const { dispatch } = useAuth()
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            email: 'admin@digital.com',
            password: '123456'
        },
        resolver: zodResolver(FormFieldsSchema)
    })

    /**
     * @TODO: Implement login
     */
    const onHandleSubmitForm = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const res = await api.post(backendUrl + "/api/admin/login", { email: data.email, password: data.password })
            if (res.data.success) {
                console.log(res.data)
                toast.success('Logged in successfully.')
                localStorage.setItem('accessToken', res.data.token)
                dispatch({ type: 'auth/login' })
                navigate('/')
            }
        }
        catch (err) {
            console.log('Error: ', err)
            if (axios.isAxiosError(err)) {
                console.log('Error Response: ', err.response)
                toast.error(err.response.data.message)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit(onHandleSubmitForm)} className="relative w-full max-w-sm p-6 space-y-6 bg-white rounded-lg md:w-1/2">
            <h2 className="text-xl font-medium text-black md:text-2xl">SignIn Here</h2>

            {/* Email */}
            <div>
                <input
                    {...register('email')}
                    type="text"
                    placeholder="Enter email or user name"
                    className={cn("w-full p-4 text-sm transition-all duration-300 rounded-lg bg-lightPurple focus:outline-none focus:ring-1 focus:ring-gray-400", errors.email && "focus:ring-red-500")}
                />
                {errors.email && <span className="flex items-center gap-1 mt-1 text-sm text-red-600"><span className="text-base material-symbols-outlined">
                    error
                </span>{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="relative">
                <input
                    {...register('password')}
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                    className={cn("w-full p-4 text-sm transition-all duration-300 rounded-lg bg-lightPurple focus:outline-none focus:ring-1 focus:ring-gray-400", errors.password && "focus:ring-red-500")}
                />
                <span onClick={() => setIsVisible(!isVisible)} className="absolute flex items-center cursor-pointer top-4 right-4">
                    <span className="material-symbols-outlined text-[22px] text-gray-400">
                        {isVisible ? "visibility" : "visibility_off"}
                    </span>
                </span>
                {errors.password && <span className="flex items-center gap-1 mt-1 text-sm text-red-600"><span className="text-base material-symbols-outlined">
                    error
                </span>{errors.password.message}</span>}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
                <span className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-gray-700 druation-300">
                    Forgot password?
                </span>
            </div>

            {/* Login Button */}
            <button
                disabled={isSubmitting}
                type='submit'
                className={cn("flex items-center justify-center w-full py-3 mb-24 text-white transition-colors duration-300 rounded-lg bg-primary hover:bg-red-700", isSubmitting && "cursor-not-allowed")}>
                {isSubmitting && <svg className="mr-3 -ml-1 text-white size-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-center lg:hidden">
                If you don’t have an account register <br /><strong className='text-primary'>You can Contact the IT department!</strong>
            </p>
        </form>
    )
}
