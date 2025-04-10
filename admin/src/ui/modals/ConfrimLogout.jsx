import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function ConfrimLogout({ onCloseModal }) {
    const { dispatch } = useAuth();
    const navigate = useNavigate()

    const onHandleLogout = () => {
        dispatch({ type: 'auth/logout' });
        navigate('/login', { replace: true });
    };

    return (
        <>
            <h2 className="text-lg font-semibold text-gray-900">Are you sure you want to log out?</h2>
            <div className="flex justify-end gap-3 mt-4">
                <button
                    className="px-4 py-2 text-gray-600 transition-all duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={onCloseModal}>
                    Cancel
                </button>
                <button
                    onClick={onHandleLogout}
                    className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700">
                    Yes
                </button>
            </div>
        </>
    )
}
