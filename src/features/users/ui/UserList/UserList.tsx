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
  // Если массив пустой — показываю заглушку "Список пуст"
  if (!users.length) return <Empty description="Список пуст" />;

  return (
    // Использую свой UI компонент List
    <List
      dataSource={users}
      // Для каждого пользователя рендерю виджет карточки
      renderItem={(user) => (
        <UserCardWidget 
           key={user.id} 
           user={user} 
           onEdit={onEditUser} // Прокидываю функцию редактирования вниз
        />
      )}
    />
  );
};