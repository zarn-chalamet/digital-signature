import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const navigate = useNavigate()
    const { dispatch } = useAuth()

    const onHandleLogout = () => {
        dispatch({ type: "auth/logout" })
        navigate("/login")
    }
    return (
        <div>
            <button type="button" onClick={onHandleLogout} className="px-4 py-3 text-white rounded-full bg-primary">LogOut</button>
        </div>
    )
}
