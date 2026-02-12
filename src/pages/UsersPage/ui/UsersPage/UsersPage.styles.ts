import styled from 'styled-components';
import { Layout } from 'antd';

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  background: #f5f7fa;
`;

export const Header = styled(Layout.Header)`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #eee;
`;

export const Content = styled(Layout.Content)`
  max-width: 800px;
  margin: 24px auto;
  width: 100%;
  padding: 0 16px;
`;