import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui'; 
import { ROUTES } from 'shared/consts';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // На всю высоту экрана
`;

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {/* Result — готовый компонент AntD для статусов (успех, ошибка, 404) */}
      <Result
        status="404"
        title="404"
        subTitle="Извините, такой страницы не существует."
        extra={
          // Кнопка, чтобы вернуть заблудшего пользователя на главную
          <Button type="primary" onClick={() => navigate(ROUTES.USERS)}>
            Вернуться на главную
          </Button>
        }
      />
    </Wrapper>
  );
};