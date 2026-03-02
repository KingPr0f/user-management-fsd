import React from 'react';
import { Form as AntForm, FormProps, FormItemProps } from 'antd';

interface ItemProps extends FormItemProps {
  children: React.ReactNode;
}

const Item = (props: ItemProps) => {
  return <AntForm.Item {...props} />;
};

type FormComponent = React.FC<FormProps<Record<string, unknown>>> & {
  Item: typeof Item;
  useForm: typeof AntForm.useForm;
};

const FormInternal = ({ children, ...props }: FormProps<Record<string, unknown>>) => {
  return <AntForm {...props}>{children}</AntForm>;
};

export const Form: FormComponent = Object.assign(FormInternal, {
  Item,
  useForm: AntForm.useForm,
});
