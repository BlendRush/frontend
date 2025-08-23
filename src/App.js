import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import SignIn from './Pages/SignIn';     
import Register from './Pages/Register.jsx';  
import './index.css'; 
import ForgotPW from './Pages/forgot-pw.jsx'; 
import Menu from './Pages/Menu.jsx'; 
import Cart from './Pages/Cart.jsx';
import Orders from './Pages/Order.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-pw" element={<ForgotPW />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />

      {/* Add other routes as needed */}
      {/* Example: <Route path="/profile" element={<Profile />} /> */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
