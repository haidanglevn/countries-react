import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet/>
};

export default ProtectedRoute;
