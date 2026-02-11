import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = localStorage.getItem(TOKEN_KEY);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}