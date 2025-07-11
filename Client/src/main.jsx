import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage.jsx";
import Articles from "./pages/landingPage/Articles.jsx";
import Gallery from "./pages/landingPage/Gallery.jsx";
import About from "./pages/landingPage/About.jsx";
import Contact from "./pages/landingPage/Contact.jsx";
import Login from "./admin/Login.jsx";
import PasswordReset from "./admin/PasswordReset.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import LoginHookForm from "./admin/LoginHookForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* LandingPage-Routes */}

        <Route index element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      // {/* Admin page routes */}
      <Route path="/admin-login" element={<LoginHookForm />} />
      <Route path="/admin-login/forgetpass" element={<PasswordReset />} />
      <Route path="/admin-login/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />

    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
