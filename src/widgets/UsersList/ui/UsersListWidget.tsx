import React, { useState } from 'react';
import { User } from 'entities/user/types';
import { UserList } from 'features/users/ui/UserList/UserList';
import { UserModal } from 'features/users/ui/UserModal';
import { useUsersList } from '../model';
import * as S from './UsersListWidget.styles';
import { Spin } from 'antd';
import { CreateUserButton } from 'features/create-user/ui/CreateUserButton';

export const UsersListWidget = () => {
  const { users, isLoading, isError } = useUsersList();

  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (isLoading) {
    return (
      <S.LoaderWrapper>
        <Spin size="large" />
      </S.LoaderWrapper>
    );
  }

  if (isError) {
    return <S.ErrorMessage>Ошибка загрузки данных</S.ErrorMessage>;
  }

  return (
    <>
      <UserList users={users} onEditUser={setEditingUser} />

      <S.CreateButtonWrapper>
        <CreateUserButton />
      </S.CreateButtonWrapper>

      <UserModal isOpen={!!editingUser} onClose={() => setEditingUser(null)} user={editingUser} />
    </>
  );
};
