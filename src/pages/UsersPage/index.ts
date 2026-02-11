import { lazy } from 'react';

export const UsersPageAsync = lazy(() => 
  import('./ui/UsersPage/UsersPage').then(module => ({ default: module.UsersPage }))
);