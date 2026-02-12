import React from 'react';
import { Card, Layout } from 'antd';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useLogin } from 'features/auth/model/useLogin';
import { ROUTES } from 'shared/consts';
import { Button, Form, Input } from 'shared/ui';
import { getToken } from 'shared/lib/token';

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const LoginPage = () => {
  const { login, isLoading } = useLogin();

  if (getToken()) return <Navigate to={ROUTES.USERS} replace />;

  return (
    <StyledLayout>
      <StyledCard title="Вход в систему">
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
      </StyledCard>
    </StyledLayout>
  );
};

export default LoginPage;