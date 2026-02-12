import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { ROUTES } from 'shared/consts';
import { setToken } from 'shared/lib/token';

interface LoginParams {
  login?: string;
  password?: string;
}


const fakeLoginRequest = (values: LoginParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.login === 'admin' && values.password === 'admin') {
        resolve('mock-jwt-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 1000);
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: fakeLoginRequest,
   
    onSuccess: (token) => {
      setToken(token);
      navigate(ROUTES.USERS);
    },
    onError: (error: any) => {
      const message = error.message || 'Ошибка входа';
      notification.error({ message });
    }
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading 
  };
};