import React, { useState } from 'react';
import { User } from 'entities/user/types';
import { Loader } from 'shared/ui';
import { UserList } from 'features/users/ui/UserList/UserList';
import { UserModal } from 'features/users/ui/UserModal';

import { useUsersList } from '../model';

export const UsersListWidget = () => {
 
  const { users, isLoading, isError } = useUsersList();
  
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (isLoading) return <Loader />;
  if (isError) return <div>Ошибка загрузки данных</div>;

  return (
    <>
      <div style={{ opacity: isLoading ? 0.5 : 1, transition: '0.3s' }}>
        <UserList 
          users={users} 
          onEditUser={setEditingUser} 
        />
      </div>
      
      <UserModal 
        isOpen={!!editingUser} 
        onClose={() => setEditingUser(null)} 
        user={editingUser} 
      />
    </>
  );
};