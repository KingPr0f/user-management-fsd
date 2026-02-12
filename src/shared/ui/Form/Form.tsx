import React from 'react';
import { Form as AntForm, FormProps, FormItemProps } from 'antd';


interface ItemProps extends FormItemProps {
  children: React.ReactNode;
}

const Item = (props: ItemProps) => {
  return <AntForm.Item {...props} />;
};


type FormComponent = React.FC<FormProps<any>> & {
  Item: typeof Item;
  useForm: typeof AntForm.useForm;
};


const FormInternal = ({ children, ...props }: FormProps<any>) => {
  return <AntForm {...props}>{children}</AntForm>;
};



const FormTemp: any = FormInternal;


FormTemp.Item = Item;
FormTemp.useForm = AntForm.useForm;


export const Form: FormComponent = FormTemp;