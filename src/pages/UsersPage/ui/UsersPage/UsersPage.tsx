import React from 'react';
import { Button } from 'antd';
import { useLogout } from 'features/auth/model/useLogout';
import { UsersListWidget } from 'widgets/UsersList';
import * as S from './UsersPage.styles';

export const UsersPage = () => {
  const logout = useLogout();

  return (
    <S.PageLayout>
      <S.Header>
        <Button type="primary" onClick={logout}>
          Выход
        </Button>
      </S.Header>

      <S.Content>
        <UsersListWidget />
      </S.Content>
    </S.PageLayout>
  );
};
