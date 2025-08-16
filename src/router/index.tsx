import {createHashRouter} from "react-router";
import Home from "@views/home";
import Login from "@views/login";
import {Test} from "@components/index";
import ProtectedRoute from "@router/guard";


const router = createHashRouter([
    {
        path: '/',
        element:<ProtectedRoute><Home /></ProtectedRoute>,
    },
    {
        path: '/home',
        element:<ProtectedRoute><Home /></ProtectedRoute>,
    },
    {
        path:'/login',
        element:<Login/>
    },{
        path: '/test',
        element: <ProtectedRoute><Test /></ProtectedRoute>,
    },

])




export default router;