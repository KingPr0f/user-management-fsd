import styled from 'styled-components';
import { Input } from 'antd';

export const FooterEditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const DisabledInput = styled(Input)`
  background-color: #e5e5e5;
  color: #000;
`;
