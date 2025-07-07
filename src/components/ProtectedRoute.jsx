// File: src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowed }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    console.warn("Access denied: User not logged in");
    return <Navigate to="/login" replace />;
  }

  if (!allowed.includes(user.role)) {
    console.warn(`Access denied: Role "${user.role}" is not allowed`);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
