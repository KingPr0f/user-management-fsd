import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from 'features/auth/model/useLogin';
import { ROUTES } from 'shared/consts';
import { Button, Form, Input } from 'shared/ui';
import { getToken } from 'shared/lib/token';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  const { login, isLoading } = useLogin();

  if (getToken()) return <Navigate to={ROUTES.USERS} replace />;

  return (
    <S.Wrapper>
      <S.LoginCard title="Вход в систему">
        <Form onFinish={login} layout="vertical" size="large">
          <Form.Item name="login" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input placeholder="Логин (admin)" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder="Пароль (admin)" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Войти
          </Button>
        </Form>
      </S.LoginCard>
    </S.Wrapper>
  );
};

export default LoginPage;