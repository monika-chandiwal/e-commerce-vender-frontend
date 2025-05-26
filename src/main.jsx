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
import AddProduct from "./Pages/addProduct.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import UpdateProduct from "./Pages/UpdateProduct.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor/home" element={<Home />} />
        <Route path="/vendor/products" element={<Products />} />
        <Route path="/vendor/login" element={<Login />} />
        <Route path="/vendor/signup" element={<Signup />} />
        <Route
          path="/vendor/mobileOtpVerification"
          element={<MobileOtpVerification />}
        />
        <Route path="/vendor/dashboard" element={<Dashboard />} />
        <Route path="/vendor/updateProduct/*" element={<UpdateProduct />} />
        <Route path="/vendor/addProduct" element={<AddProduct />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </ThemeProvider>
);
