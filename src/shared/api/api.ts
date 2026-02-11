import axios from 'axios';
import { notification } from 'antd';
import { API_URL, TOKEN_KEY, ROUTES } from 'shared/consts';

// Создаю инстанс axios с базовым URL, чтобы не писать его каждый раз вручную
export const api = axios.create({ baseURL: API_URL });

// Interceptor (перехватчик) ЗАПРОСА:
// Перед тем как запрос уйдет на сервер, я автоматически добавляю в него токен авторизации.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor ОТВЕТА:
// Здесь я обрабатываю ошибки глобально для всего приложения.
api.interceptors.response.use(
  (res) => res, // Если успех — просто возвращаю ответ
  (error) => {
    // Если сервер ответил 401 (Unauthorized) — значит токен протух.
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY); // Стираю плохой токен
      window.location.href = ROUTES.LOGIN; // Выкидываю на логин
    } else if (error.code !== 'ERR_CANCELED') {
      // Если это любая другая ошибка (кроме отмены запроса), показываю уведомление пользователю
      notification.error({
        message: 'Ошибка',
        description: error.response?.statusText || 'Что-то пошло не так',
      });
    }
    return Promise.reject(error);
  }
);