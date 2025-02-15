import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ManageUser from "../pages/ManageUser";
import Report from "../pages/Report";
import Template from "../pages/Template";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ManageUser />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/template",
        element: <Template />,
      },
    ],
  },
]);

export default router;
