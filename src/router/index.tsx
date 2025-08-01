import {createHashRouter} from "react-router";
import Home from "@views/home";
import Login from "@views/login";


const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path:'/login',
        element:<Login/>
    }

])




export default router;