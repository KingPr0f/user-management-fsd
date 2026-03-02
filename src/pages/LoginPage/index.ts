import { lazy } from 'react';

export const LoginPageAsync = lazy(() =>
  import('./ui/LoginPage/LoginPage').then((module) => ({
    default: module.LoginPage,
  })),
);
