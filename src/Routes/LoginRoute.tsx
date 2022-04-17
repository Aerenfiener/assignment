import useToken from '../Hooks/Token';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export function LoginRoute({ children }: { children: JSX.Element }) {
  const { token } = useToken();
  const location = useLocation();
  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
