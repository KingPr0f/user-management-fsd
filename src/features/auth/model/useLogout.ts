import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/consts';
import { removeToken } from 'shared/lib/token';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate(ROUTES.LOGIN);
  };

  return logout;
};