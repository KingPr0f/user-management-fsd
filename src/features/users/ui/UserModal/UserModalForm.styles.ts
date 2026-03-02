import styled from 'styled-components';
import { Input } from 'antd';

export const DisabledInput = styled(Input)`
  background-color: #e5e5e5;
  color: #000;
`;

export const FormActions = styled.div<{ $isEdit: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isEdit ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-top: 24px;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 8px;
`;
