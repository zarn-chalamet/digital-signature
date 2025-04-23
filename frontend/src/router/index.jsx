import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import useAuth from '@/hooks/useAuth'

export default function Router() {
    const { isAuthenticated, authReady } = useAuth()

    const router = createBrowserRouter([
        {
            path: '/',
            element: isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                }
            ]
        },
        {
            path: '/login',
            element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
        }
    ])

    return authReady && <RouterProvider router={router} />
}
