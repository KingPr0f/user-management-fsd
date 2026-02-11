import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 200px;
`;

export const Loader = () => (
  <Wrapper>
    <Spin size="large" />
  </Wrapper>
);