import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "../hooks/useClickOutside";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import useTheme from "../hooks/useTheme";

export default function DashboardLayout() {
    const { isDark } = useTheme()
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);

    //? Toggle sidebar
    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    //? Toggle Theme
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('bg-slate-950')
        }
        else {
            document.body.classList.remove('bg-slate-950')
        }
    }, [isDark])

    return (
        <div className="min-h-screen transition-colors ">
            <div className={cn(
                "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
            )} />
            {/* Side Bar */}
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[100px]" : "md:ml-[280px]")}>
                {/* Header */}
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
