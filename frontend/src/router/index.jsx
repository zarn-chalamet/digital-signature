import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RequestsPage from "../pages/RequestsPage";
import TemplatesPage from "../pages/TemplatesPage";
import ReportsPage from "../pages/ReportsPage";
import HistoryPage from "../pages/HistoryPage";
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
                    element: <Navigate to={'dashboard'} replace />
                },
                {
                    path: '/dashboard',
                    element: <DashboardPage />
                },
                {
                    path: '/requests',
                    element: <RequestsPage />
                },
                {
                    path: '/templates',
                    element: <TemplatesPage />
                },
                {
                    path: '/reports',
                    element: <ReportsPage />
                },
                {
                    path: '/history',
                    element: <HistoryPage />
                },
            ]
        },
        {
            path: '/login',
            element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
        }
    ])

    return authReady && <RouterProvider router={router} />
}
