import useToken from '../Hooks/Token';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';


export function RequireRoute({ children }: { children: JSX.Element }) {
  const { token } = useToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
