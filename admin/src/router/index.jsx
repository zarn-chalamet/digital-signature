import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/layout/Layout";
import Dashboard from "../pages/Dashboard";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../pages/DashboardLayout";
import useTheme from "../hooks/useTheme";

export default function Router() {
  const { isAuthenticated, authReady } = useAuth()
  const { isDark } = useTheme()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: '',
          element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "template",
              element: <h1 className={`title ${isDark && 'text-slate-50'}`}>Template</h1>,
            },
            {
              path: "reports",
              element: <h1 className={`title ${isDark && 'text-slate-50'}`}>Reports</h1>,
            },
          ]
        },
        {
          path: "/login",
          element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" />,
        }
      ],
    },
  ]);

  return (
    authReady && <RouterProvider router={router} />
  )
}



