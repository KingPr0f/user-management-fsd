import React, { useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

// Imports from layers
import { Button, Loader } from 'shared/ui';
import { USER_QUERY_KEY } from 'shared/consts';
//import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
//import { UserList } from 'features/users/ui/UserList/UserList';
//import { UserModal } from 'features/users/ui/UserModal/UserModal';
import { useLogout } from 'features/auth/model/useLogout'; // Новый хук

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
  const logout = useLogout(); // Используем хук
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Фетчинг данных ПОДНЯТ В СТРАНИЦУ (Пункт 3)
  const { data, isLoading } = useQuery(USER_QUERY_KEY, userApi.getAll);

  const openCreate = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // Сортировка
  const sortedUsers = data 
    ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <PageLayout>
      <Header>
        <Typography.Title level={4} style={{ margin: 0 }}>Пользователи</Typography.Title>
        <Button icon={<LogoutOutlined />} onClick={logout}>Выход</Button>
      </Header>

      <Content>
        <Row justify="end" style={{ marginBottom: 20 }}>
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={openCreate}>
            Создать
          </Button>
        </Row>
        
        
    
      </Content>
    </PageLayout>
  );
};