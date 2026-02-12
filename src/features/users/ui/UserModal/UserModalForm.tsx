import React from 'react';
import { Form, Input, Button, Popconfirm } from 'antd';
import * as S from './UserModal.styles';

interface UserModalFormProps {
  form: any;
  isEdit: boolean;
  onDelete: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const UserModalForm: React.FC<UserModalFormProps> = ({ 
  form, isEdit, onDelete, onCancel, onSubmit 
}) => (
  <Form form={form} layout="vertical">
    {isEdit && <Form.Item label="ID" name="id"><Input disabled /></Form.Item>}
    <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
      <Input placeholder="Имя пользователя" />
    </Form.Item>
    <Form.Item name="avatar" label="Аватар" rules={[{ required: true, message: 'URL аватара' }, { type: 'url' }]}>
      <Input placeholder="https://..." />
    </Form.Item>

    <S.ButtonGroup>
      {isEdit && (
        <Popconfirm title="Удалить?" onConfirm={onDelete} okText="Да" cancelText="Нет">
          <Button danger>Удалить</Button>
        </Popconfirm>
      )}
      <Button onClick={onCancel}>Отмена</Button>
      <Button type="primary" onClick={onSubmit}>
        {isEdit ? 'Сохранить' : 'Создать'}
      </Button>
    </S.ButtonGroup>
  </Form>
);