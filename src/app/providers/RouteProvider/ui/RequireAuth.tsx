import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // Получаю токен из локального хранилища, чтобы проверить авторизацию
  const auth = localStorage.getItem(TOKEN_KEY);
  // Запоминаю текущий маршрут, чтобы после входа вернуть пользователя сюда
  const location = useLocation();

  // Если токена нет — перенаправляю на страницу логина
  if (!auth) {
    // state={{ from: location }} нужен, чтобы после логина сделать редирект обратно
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Если авторизован — рендерю защищенный контент (страницу)
  return children;
}