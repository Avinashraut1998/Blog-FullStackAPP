import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/landingPage/LandingPage.jsx'
import Articles from './pages/landingPage/Articles.jsx'
import Gallery from './pages/landingPage/Gallery.jsx'
import About from './pages/landingPage/About.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
         <Route index element={<LandingPage/>} />
         <Route path='/about' element={<About />} />
         <Route path='/gallery' element={<Gallery />} />
         <Route path='/article' element={<Articles />} />
    </Route >
  )
)




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)