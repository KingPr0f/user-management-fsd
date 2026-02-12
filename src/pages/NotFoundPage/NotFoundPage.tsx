import React from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui'; 
import { ROUTES } from 'shared/consts';
import * as S from './NotFoundPage.styles';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <Result
        status="404"
        title="404"
        subTitle="Извините, такой страницы не существует."
        extra={
          <Button type="primary" onClick={() => navigate(ROUTES.USERS)}>
            Вернуться на главную
          </Button>
        }
      />
    </S.Wrapper>
  );
};