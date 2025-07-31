import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'normalize.css/normalize.css'
import {HashRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <HashRouter>
          <App />

      </HashRouter>
  </StrictMode>,
)
