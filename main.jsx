import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { CartProvider } from "./src/context/CartContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
