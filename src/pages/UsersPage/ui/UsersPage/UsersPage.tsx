import React from 'react';
import { Row, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'shared/ui';
import { useLogout } from 'features/auth/model/useLogout';
import { CreateUserButton } from 'features/create-user'; 
import { UsersListWidget } from 'widgets/UsersList';
import * as S from './UsersPage.styles';

export const UsersPage = () => {
  const logout = useLogout();

  return (
    <S.PageLayout>
      <S.Header>
        <Typography.Title level={4} style={{ margin: 0 }}>Пользователи</Typography.Title>
        <Button icon={<LogoutOutlined />} onClick={logout}>Выход</Button>
      </S.Header>

      <S.Content>
        <Row justify="end" style={{ marginBottom: 20 }}>
          <CreateUserButton />
        </Row>
        
        <UsersListWidget />
      </S.Content>
    </S.PageLayout>
  );
};