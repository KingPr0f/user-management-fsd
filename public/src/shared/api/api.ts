import axios from 'axios';
import { notification } from 'antd';
import { API_URL, TOKEN_KEY, ROUTES } from 'shared/consts';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = ROUTES.LOGIN;
    } else if (error.code !== 'ERR_CANCELED') {
      notification.error({
        message: 'Ошибка',
        description: error.response?.statusText || 'Что-то пошло не так',
      });
    }
    return Promise.reject(error);
  }
);