import React from 'react';
import { List } from 'antd';
import dayjs from 'dayjs';
import { User } from 'entities/user/types';
import * as S from './UserList.styles';

interface UserListProps {
  users?: User[];
  onEditUser: (user: User) => void;
}

export const UserList = ({ users, onEditUser }: UserListProps) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={<S.ClickableAvatar src={user.avatar} onClick={() => onEditUser(user)} />}
            title={<S.UserName onClick={() => onEditUser(user)}>{user.name}</S.UserName>}
            description={
              <S.DateText>Зарегистрирован {dayjs(user.createdAt).format('DD.MM.YYYY')}</S.DateText>
            }
          />
        </List.Item>
      )}
    />
  );
};
