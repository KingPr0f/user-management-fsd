import React from 'react';
import { Form as AntForm, FormProps, FormItemProps } from 'antd';

// Обертка для Form.Item
interface ItemProps extends FormItemProps {
  children: React.ReactNode;
}

const Item = (props: ItemProps) => {
  return <AntForm.Item {...props} />;
};

// Тип для нашего итогового компонента
type FormComponent = React.FC<FormProps<any>> & {
  Item: typeof Item;
  useForm: typeof AntForm.useForm;
};

// Внутренний компонент (простая функция)
const FormInternal = ({ children, ...props }: FormProps<any>) => {
  return <AntForm {...props}>{children}</AntForm>;
};

// --- ИСПРАВЛЕНИЕ ---
// 1. Создаем временную переменную с типом any.
// Это заставляет TypeScript "отстать" и разрешить нам делать что угодно.
const FormTemp: any = FormInternal;

// 2. Прикрепляем свойства (теперь ошибок не будет)
FormTemp.Item = Item;
FormTemp.useForm = AntForm.useForm;

// 3. Экспортируем уже готовую переменную, возвращая ей строгий тип
export const Form: FormComponent = FormTemp;