import styled from 'styled-components';
import { Card, Layout } from 'antd';

export const Wrapper = styled(Layout)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;