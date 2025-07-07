import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowed }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || !allowed.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
