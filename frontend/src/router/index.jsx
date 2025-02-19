import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import Request from "../pages/Request";
import Template from "../pages/Template";
import Report from "../pages/Report";
import History from "../pages/History";
import IndividualTemplate from "../pages/IndividualTemplate";
import CreateRequest from "../pages/CreateRequest";
import SignPdf from "../pages/SignPdf";

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
            {
                path: "/create-request",
                element: <CreateRequest/>
            },
            {
                path: "/sign-pdf/:id",
                element: <SignPdf/>
            }
        ]
    }
])

export default router;