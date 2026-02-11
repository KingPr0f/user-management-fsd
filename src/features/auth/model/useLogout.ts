import { useNavigate } from 'react-router-dom';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate(ROUTES.LOGIN);
  };

  return logout;
};