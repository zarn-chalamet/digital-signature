import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { Toaster } from "react-hot-toast";

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
            <Toaster position="top-center" toastOptions={{
                duration: 3000,
                removeDelay: 1000,
                style: {
                    textAlign: 'center',
                    background: isDark ? '#333' : "#ffffff",
                    color: isDark ? "#ffffff" : "#333",
                    padding: "12px",
                    borderRadius: "8px",
                },
            }} />
        </div>
    );
}