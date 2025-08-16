import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import SignIn from './Pages/SignIn';     // create stub if not exists
import Register from './Pages/Register.jsx';  // create stub if not exists
import './index.css'; // Ensure you have your styles imported
import ForgotPW from './Pages/forgot-pw.jsx'; // Import the forgot password page
import Menu from './Pages/Menu.jsx'; // Import the Menu page

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-pw" element={<ForgotPW />} />
      <Route path="/menu" element={<Menu />} />
      {/* Add other routes as needed */}
      {/* Example: <Route path="/profile" element={<Profile />} /> */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
