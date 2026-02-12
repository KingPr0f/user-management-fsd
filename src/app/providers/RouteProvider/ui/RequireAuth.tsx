import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/consts';
import { getToken } from 'shared/lib/token';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = getToken();
  const location = useLocation();

  if (!auth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}