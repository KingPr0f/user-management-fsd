import React from 'react';
import { Button as AntButton, ButtonProps } from 'antd';

export const Button = (props: ButtonProps) => {
  return <AntButton {...props} />;
};