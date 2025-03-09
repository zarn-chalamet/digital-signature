import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTheme from "../../hooks/useTheme";

export default function Layout() {
    const { isDark } = useTheme()
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('bg-slate-950')
        }
        else {
            document.body.classList.remove('bg-slate-950')
        }
    }, [isDark])

    return (
        <div>
            <Outlet />
            <ToastContainer />
        </div>
    );
}