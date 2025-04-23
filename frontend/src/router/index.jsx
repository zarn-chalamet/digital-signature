import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                }
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        }
    ])

    return <RouterProvider router={router} />
}
