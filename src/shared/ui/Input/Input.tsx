import React from 'react';
import { Input as AntInput, InputProps } from 'antd';

export const Input = (props: InputProps) => {
  return <AntInput {...props} />;
};


Input.Password = AntInput.Password;
Input.TextArea = AntInput.TextArea;