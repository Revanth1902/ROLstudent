// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const userCookie = Cookies.get("user");
  return userCookie ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
