import styled from 'styled-components';
import { Avatar } from 'antd';

export const ClickableAvatar = styled(Avatar)`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

export const UserName = styled.span`
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  color: #000000;
`;

export const DateText = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`;
