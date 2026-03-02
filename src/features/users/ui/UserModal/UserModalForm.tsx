import React from 'react';
import { FormInstance, Input, Button } from 'antd';
import { Form } from 'shared/ui/Form/Form';
import * as S from './UserModalForm.styles';

interface UserModalFormProps {
  form: FormInstance;
  isEdit: boolean;
  onDelete: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const UserModalForm = ({
  form,
  isEdit,
  onDelete,
  onCancel,
  onSubmit,
  isLoading,
}: UserModalFormProps) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      {isEdit && (
        <Form.Item label="id" name="id">
          <S.DisabledInput disabled />
        </Form.Item>
      )}

      <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Обязательное поле' }]}>
        <Input disabled={isLoading} />
      </Form.Item>

      <Form.Item
        label="Ссылка на аватарку"
        name="avatar"
        rules={[
          { required: true, message: 'Обязательное поле' },
          { type: 'url', message: 'Введите корректный URL' },
        ]}
      >
        <Input disabled={isLoading} />
      </Form.Item>

      <S.FormActions $isEdit={isEdit}>
        {isEdit && (
          <Button type="primary" onClick={onDelete} loading={isLoading}>
            Удалить
          </Button>
        )}

        <S.RightButtons>
          <Button type="primary" onClick={onSubmit} loading={isLoading}>
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button type="primary" onClick={onCancel} disabled={isLoading}>
            Отмена
          </Button>
        </S.RightButtons>
      </S.FormActions>
    </Form>
  );
};
