import React from 'react';
import { Button } from 'shared/ui';
import { useLogout } from 'features/auth/model/useLogout';

export const Navbar = () => {
  const logout = useLogout();
  
  return (
     <Button onClick={logout}>Выход</Button>
  );
};