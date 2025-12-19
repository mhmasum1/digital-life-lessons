import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routes/router";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* ✅ GLOBAL TOASTER */}
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
