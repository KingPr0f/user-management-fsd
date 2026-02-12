import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from 'shared/consts';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { Loader } from 'shared/ui';
import { UserList } from 'features/users/ui/UserList/UserList';
import { UserModal } from 'features/users/ui/UserModal/UserModal';

export const UsersListWidget = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: USER_QUERY_KEY, 
    queryFn: userApi.getAll
  });

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  const sortedUsers = data 
    ? [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];


  if (isLoading && !data) return <Loader />;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <>
    
      <div style={{ opacity: isLoading ? 0.5 : 1, transition: '0.3s' }}>
          <UserList users={sortedUsers} onEditUser={handleEdit} />
      </div>
      
      <UserModal 
        isOpen={!!editingUser} 
        onClose={closeEditModal} 
        user={editingUser} 
      />
    </>
  );
};