import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { Navigate } from "react-router-dom";
interface props {
  children: React.ReactNode;
}

// for the routes that needed to shown if the user is logged in
const PrivateRoute: React.FC<props> = ({ children }) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
