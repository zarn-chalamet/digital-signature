import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../pages/layout/Layout";
import Dashboard from "../pages/Dashboard";
import useAuth from "../hooks/useAuth";

export default function Router() {
  const { isAuthenticated, authReady } = useAuth()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
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



