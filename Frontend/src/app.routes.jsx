import { createBrowserRouter } from "react-router";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])
