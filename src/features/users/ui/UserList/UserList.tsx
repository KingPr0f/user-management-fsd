import React from 'react';
import { Empty } from 'antd';
import { List } from 'shared/ui';
import { User } from 'entities/user/types';
import { UserCardWidget } from 'widgets/UserCard'; 

interface Props {
  users: User[];
  onEditUser: (user: User) => void;
}

export const UserList: React.FC<Props> = ({ users, onEditUser }) => {
  if (!users.length) return <Empty description="Список пуст" />;

  return (
    <List
      dataSource={users}
      renderItem={(user) => (
        <UserCardWidget 
           key={user.id} 
           user={user} 
           onEdit={onEditUser} 
        />
      )}
    />
  );
};