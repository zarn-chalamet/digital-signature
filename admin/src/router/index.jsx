import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../pages/DashboardLayout";
import useTheme from "../hooks/useTheme";
import TemplatePage from "../pages/TemplatePage";
import ManageUsers from "../pages/ManageUsers";

export default function Router() {
  const { isAuthenticated, authReady } = useAuth()
  const { isDark } = useTheme()

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          index: true,
          element: <Navigate to={'manage-users'} replace />
        },
        {
          path: "manage-users",
          element: <ManageUsers />,
        },
        {
          path: "template",
          element: <TemplatePage />
        },
        {
          path: "reports",
          element: <h1 className={`title dark:text-slate-50`}>Reports</h1>,
        },
      ]
    },
    {
      path: "/login",
      element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: "*",
      element: <h1>404</h1>
    }
  ]);

  return (
    authReady && <RouterProvider router={router} />
  )
}



