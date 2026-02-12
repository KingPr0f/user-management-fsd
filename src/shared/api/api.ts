import axios from 'axios';
import { notification } from 'antd';
import { API_URL, ROUTES } from 'shared/consts';
import { getToken, removeToken } from 'shared/lib/token';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
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