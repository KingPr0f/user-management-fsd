import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { ROUTES, TOKEN_KEY } from 'shared/consts';

interface LoginParams {
  login?: string;
  password?: string;
}

const fakeLoginRequest = (values: LoginParams) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.login === 'admin' && values.password === 'admin') {
        resolve('mock-jwt-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: fakeLoginRequest,
    
    onSuccess: (token) => {
      // @ts-ignore
      localStorage.setItem(TOKEN_KEY, token);
      navigate(ROUTES.USERS);
    },
    onError: (error) => {
      // @ts-ignore
      const message = error.message || 'Ошибка входа';
      notification.error({ message });
    }
  });

  return { 
    login: mutation.mutate, 
    isLoading: mutation.isLoading 
  };
};