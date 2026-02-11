import { useNavigate } from 'react-router-dom';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Удаляю "ключ" доступа
    localStorage.removeItem(TOKEN_KEY);
    // Отправляю на страницу входа
    navigate(ROUTES.LOGIN);
  };

  return logout;
};