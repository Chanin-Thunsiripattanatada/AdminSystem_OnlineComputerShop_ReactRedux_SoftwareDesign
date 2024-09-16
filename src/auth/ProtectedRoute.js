import React from 'react';
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext';// Adjust the import path as necessary

function ProtectedRoute({ children }){
  const { token } = useAuth();
  if (!token) {
    return <Navigate to = "/" />
  }
  

  return children;
};

export default ProtectedRoute;
