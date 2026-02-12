import React from 'react';
import { Layout, Row, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { Button } from 'shared/ui';
import { useLogout } from 'features/auth/model/useLogout';
import { CreateUserButton } from 'features/create-user'; 
import { UsersListWidget } from 'widgets/UsersList';    

const PageLayout = styled(Layout)`
  min-height: 100vh;
  background: #f5f7fa;
`;

const Header = styled(Layout.Header)`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #eee;
`;

const Content = styled(Layout.Content)`
  max-width: 800px;
  margin: 24px auto;
  width: 100%;
  padding: 0 16px;
`;

export const UsersPage = () => {
  const logout = useLogout();

  return (
    <PageLayout>
      <Header>
        <Typography.Title level={4} style={{ margin: 0 }}>Пользователи</Typography.Title>
        <Button icon={<LogoutOutlined />} onClick={logout}>Выход</Button>
      </Header>

      <Content>
        
        <Row justify="end" style={{ marginBottom: 20 }}>
          <CreateUserButton />
        </Row>
        
        
        <UsersListWidget />
      </Content>
    </PageLayout>
  );
};