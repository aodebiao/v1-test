import {createHashRouter} from "react-router";
import Home from "@views/home";


const router = createHashRouter([
    {
        path: '/',
        element: Home,
    }

])




export default router;