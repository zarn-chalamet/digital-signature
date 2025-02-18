import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Request from "../pages/Request";
import Template from "../pages/Template";
import Report from "../pages/Report";
import History from "../pages/History";
import IndividualTemplate from "../pages/IndividualTemplate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/request",
                element: <Request/>
            },
            {
                path: "/template",
                element: <Template/>
            },
            {
                path: "/report",
                element: <Report/>
            },
            {
                path: "/history",
                element: <History/>
            },
            {
                path: "/template/:id",
                element: <IndividualTemplate/>
            },
        ]
    }
])

export default router;