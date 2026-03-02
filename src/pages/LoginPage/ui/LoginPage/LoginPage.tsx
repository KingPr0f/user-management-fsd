import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/consts';
import { setToken } from 'shared/lib/token';
import * as S from './LoginPage.styles';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: Record<string, string>) => {
    setIsLoading(true);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.username === 'admin' && values.password === 'admin') {
          resolve('dummy-jwt-token');
        } else {
          reject(new Error('Неверный логин или пароль'));
        }
      }, 2000);
    })
      .then((token) => {
        setToken(token as string);
        navigate(ROUTES.USERS, { replace: true });
      })
      .catch((err: Error) => {
        notification.error({ message: err.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <S.FullPageCenter>
      <S.AuthCard>
        <S.FormTitle>Авторизация</S.FormTitle>

        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Обязательное поле' }]}>
            <Input size="large" placeholder="Логин" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Обязательное поле' }]}>
            <Input.Password size="large" placeholder="Пароль" />
          </Form.Item>

          <S.ButtonWrapper>
            <Button type="primary" size="large" htmlType="submit" loading={isLoading}>
              Войти
            </Button>
          </S.ButtonWrapper>
        </Form>
      </S.AuthCard>
    </S.FullPageCenter>
  );
};
