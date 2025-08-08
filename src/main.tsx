import { createRoot } from 'react-dom/client'
import 'normalize.css/normalize.css'
import { RouterProvider} from "react-router";
import router from "@router/index";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './mock/user'; // mock 的配置文件，里面写Mock.mock(...)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
     <RouterProvider router={router}/>
  // </StrictMode>,
)
