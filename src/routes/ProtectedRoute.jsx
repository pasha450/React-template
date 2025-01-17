import React from 'react';
import { Navigate } from 'react-router-dom';
import {useUser} from "../contexts/auth-reducer/userContext"

const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // Access the current user from the context

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children; 
};

export default ProtectedRoute;
