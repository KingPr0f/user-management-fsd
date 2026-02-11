import React from 'react';
import { Avatar, Typography } from 'antd'; 
import { List } from 'shared/ui';
import dayjs from 'dayjs';
import { User } from '../types';
import styled from 'styled-components';

interface Props {
  user: User;
  // actions — это массив кнопок (например, "Редактировать"), которые придут сверху
  actions?: React.ReactNode[];
}

// Стилизую компонент Ant Design, чтобы выровнять аватарку и текст по центру
const StyledMeta = styled(List.Item.Meta)`
  align-items: center;
`;

export const UserCard: React.FC<Props> = ({ user, actions }) => (
  // List.Item — стандартный элемент списка AntD, сюда я передаю кнопки действий
  <List.Item actions={actions}>
    <StyledMeta
      // Показываю аватарку, беру ссылку из данных пользователя
      avatar={<Avatar src={user.avatar} size={48} />}
      // Имя делаю жирным для акцента
      title={<Typography.Text strong>{user.name}</Typography.Text>}
      // Форматирую дату регистрации в привычный вид ДД.ММ.ГГГГ с помощью dayjs
      description={`Регистрация: ${dayjs(user.createdAt).format('DD.MM.YYYY')}`}
    />
  </List.Item>
);