import {createHashRouter} from "react-router";
import Home from "@views/home";
import Login from "@views/login";
import {Test} from "@components/index";


const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path:'/login',
        element:<Login/>
    },{
        path: '/test',
        element: <Test />,
    },

])




export default router;