import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register.jsx";
import "./index.css";
import ForgotPW from "./Pages/forgot-pw.jsx";
import Menu from "./Pages/Menu.jsx";
import Cart from "./Pages/Cart.jsx";
import Orders from "./Pages/Order.jsx";
import About from "./Pages/About.jsx"; 
import { AuthContext } from "./context/AuthContext.jsx";
import ResetPW from "./Pages/reset-pw.jsx";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-pw" element={<ForgotPW />} />
      <Route path="/reset-pw" element={<ResetPW />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />

      {token !== null && token !== "" ? (
        <>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<div>Not Found</div>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/home" />} />
      )}
    </Routes>
  );
}
