import React from 'react';
import { Card, Layout } from 'antd'; 
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useLogin } from 'features/auth/model/useLogin';
import { ROUTES, TOKEN_KEY } from 'shared/consts';
import { Button, Form, Input } from 'shared/ui'; 

// Делаю центровку формы по центру экрана с помощью flexbox
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

// Ограничиваю ширину карточки, чтобы она не растягивалась на широких мониторах
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const LoginPage = () => {
  // Достаю логику входа (функцию login и статус загрузки) из кастомного хука
  const { login, isLoading } = useLogin();
  
  // Проверяю: если пользователь уже авторизован (есть токен), не показываю ему логин,
  // а сразу редирекчу внутрь системы. Replace нужен, чтобы кнопка "Назад" не возвращала на логин.
  if (localStorage.getItem(TOKEN_KEY)) return <Navigate to={ROUTES.USERS} replace />;

  return (
    <StyledLayout>
      <StyledCard title="Вход в систему">
        {/* onFinish автоматически вызывается Ant Design при успешной валидации и сабмите */}
        <Form onFinish={login} layout="vertical" size="large">
          
          {/* Валидация: поле обязательно для заполнения */}
          <Form.Item name="login" rules={[{ required: true, message: 'Введите логин' }]}>
            <Input placeholder="Логин (admin)" />
          </Form.Item>
          
          <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder="Пароль (admin)" />
          </Form.Item>
          
          {/* Кнопка блокируется (loading), пока идет запрос, чтобы не было дублей */}
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Войти
          </Button>
        </Form>
      </StyledCard>
    </StyledLayout>
  );
};

export default LoginPage;