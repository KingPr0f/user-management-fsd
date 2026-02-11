import React, { useState } from 'react';
import { Layout, Row, Typography } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { Button, Loader } from 'shared/ui';
import { USER_QUERY_KEY } from 'shared/consts';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { UserList } from 'features/users/ui/UserList/UserList';
import { UserModal } from 'features/users/ui/UserModal/UserModal';
import { useLogout } from 'features/auth/model/useLogout';

// Стили раскладки страницы
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
  
  // Состояние модального окна: открыто/закрыто
  const [modalOpen, setModalOpen] = useState(false);
  // Состояние редактируемого пользователя. Если null — значит создаем нового.
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Получаю список пользователей с сервера. 
  // Использую react-query для кэширования и управления состоянием загрузки.
  const { data, isLoading } = useQuery(USER_QUERY_KEY, userApi.getAll);

  // Открываю модалку на СОЗДАНИЕ (сбрасываю editingUser)
  const openCreate = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  // Открываю модалку на РЕДАКТИРОВАНИЕ (передаю данные пользователя)
  const openEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  // Сортирую пользователей по дате создания (новые сверху).
  // Делаю копию [...data], так как sort мутирует исходный массив, а это плохая практика в React.
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
        {/* Блок с кнопкой добавления */}
        <Row justify="end" style={{ marginBottom: 20 }}>
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={openCreate}>
            Создать
          </Button>
        </Row>
        
        {/* Условный рендеринг: либо крутилка загрузки, либо список */}
        {isLoading ? (
          <Loader />
        ) : (
          <UserList users={sortedUsers} onEditUser={openEdit} />
        )}
        
        {/* Модальное окно лежит в дереве всегда, но показывается только по флагу isOpen */}
        <UserModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          user={editingUser} 
        />
      </Content>
    </PageLayout>
  );
};