import React from 'react';
import { Button } from 'shared/ui';
import { UserCard } from 'entities/user/ui/UserCard';
import { User } from 'entities/user/types';

interface Props {
  user: User;
  onEdit: (user: User) => void; // Action прокидываем сверху
}

export const UserCardWidget: React.FC<Props> = ({ user, onEdit }) => {
  // Собираем слоты (actions)
  const actions = [
    <Button key="edit" type="link" onClick={() => onEdit(user)}>
      Ред.
    </Button>
  ];

  return <UserCard user={user} actions={actions} />;
};