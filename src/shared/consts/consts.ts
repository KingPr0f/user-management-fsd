// Базовый адрес моего API (MockAPI)
export const API_URL = 'https://698af90d6c6f9ebe57bb33dd.mockapi.io'; 

// Ключ, под которым токен будет лежать в localStorage браузера
export const TOKEN_KEY = 'auth_token';

// Ключ для кэша React Query. По нему я буду обновлять или доставать список пользователей.
export const USER_QUERY_KEY = ['users'];

// Словарь маршрутов приложения, чтобы при переименовании URL менять его только в одном месте
export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
};