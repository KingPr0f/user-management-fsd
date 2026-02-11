import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

interface LoginParams {
  login?: string;
  password?: string;
}

// Имитирую запрос на сервер. В реальности здесь был бы api.post('/login')
const fakeLoginRequest = (values: LoginParams) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Жестко зашитая проверка для теста
      if (values.login === 'admin' && values.password === 'admin') {
        resolve('mock-jwt-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000); // Задержка 2 секунды, чтобы увидеть лоадер
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  // Использую useMutation, так как вход меняет состояние (получаем токен)
  const mutation = useMutation({
    mutationFn: fakeLoginRequest,
    
    // Если всё прошло успешно:
    onSuccess: (token) => {
      // 1. Сохраняю токен в localStorage, чтобы при обновлении страницы не вылетало
      // @ts-ignore
      localStorage.setItem(TOKEN_KEY, token);
      // 2. Перекидываю пользователя на главную страницу (список пользователей)
      navigate(ROUTES.USERS);
    },
    // Если ошибка (неверный пароль):
    onError: (error) => {
      // @ts-ignore
      const message = error.message || 'Ошибка входа';
      // Показываю красивое уведомление об ошибке
      notification.error({ message });
    }
  });

  return { 
    login: mutation.mutate, // Функция для вызова входа
    isLoading: mutation.isLoading // Флаг загрузки для спиннера на кнопке
  };
};