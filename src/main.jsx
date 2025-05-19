import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./Common/ThemeProvider.jsx";
import MobileOtpVerification from "./Pages/MobileOtpVerification.jsx";
import VenderBrandDetails from "./Pages/VenderBrandDetails.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mobileOtpVerification"
          element={<MobileOtpVerification />}
        />
        <Route path="/venderBrandDetails" element={<VenderBrandDetails />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </ThemeProvider>
);
