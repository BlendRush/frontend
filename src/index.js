import React from "react";
//import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./Component/CartContext";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

/*createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </NotificationProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
