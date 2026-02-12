import React from 'react';
import { Avatar, Typography } from 'antd'; 
import { List } from 'shared/ui';
import dayjs from 'dayjs';
import { User } from '../types';
import styled from 'styled-components';

interface Props {
  user: User;
 
  actions?: React.ReactNode[];
}


const StyledMeta = styled(List.Item.Meta)`
  align-items: center;
`;

export const UserCard: React.FC<Props> = ({ user, actions }) => (
  
  <List.Item actions={actions}>
    <StyledMeta
      
      avatar={<Avatar src={user.avatar} size={48} />}
      
      title={<Typography.Text strong>{user.name}</Typography.Text>}
      
      description={`Регистрация: ${dayjs(user.createdAt).format('DD.MM.YYYY')}`}
    />
  </List.Item>
);