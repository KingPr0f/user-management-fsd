import styled from 'styled-components';
import { Layout } from 'antd';

export const PageLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff; /* Строго белый фон, как на макете */
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 40px 0;
  background: transparent;
`;

export const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 24px 24px 60px;
`;

export const CreateButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
`;
