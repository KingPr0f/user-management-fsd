import axios from 'axios';
import { API_URL } from '../consts';
import { getToken } from '../lib/token';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('unauthorized'));
    }
    return Promise.reject(error);
  },
);
