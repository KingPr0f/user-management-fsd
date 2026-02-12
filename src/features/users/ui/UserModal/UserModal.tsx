import React, { useEffect } from 'react';
import { Popconfirm } from 'antd'; 
import { Modal, Form, Input, Button } from 'shared/ui'; 
import { useUserMutations } from '../../model/useUserMutations';
import { User } from 'entities/user/types';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

export const UserModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const [form] = Form.useForm();
  const { create, update, remove, isLoading } = useUserMutations(onClose);
  const isEdit = !!user;

  // ИСПРАВЛЕНИЕ: Заполняем форму только когда модалка ОТКРЫТА
  useEffect(() => {
    if (isOpen) {
      if (user) {
        form.setFieldsValue(user);
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const cleanData = { name: values.name.trim(), avatar: values.avatar.trim() };
      
      if (isEdit && user) { 
        await update({ id: user.id, data: cleanData }); 
      } else {
        await create(cleanData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={!isLoading ? onClose : undefined}
      title={isEdit ? 'Редактирование' : 'Создание'}
      footer={null}
      destroyOnClose // Важно: очищает DOM при закрытии
      forceRender // Важно: помогает избежать проблем с инициализацией формы
    >
      <Form form={form} layout="vertical" disabled={isLoading}>
        {isEdit && <Form.Item label="ID" name="id"><Input disabled /></Form.Item>}
        
        <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
          <Input placeholder="Иван" />
        </Form.Item>
        
        <Form.Item name="avatar" label="Аватар" rules={[{ required: true }, { type: 'url' }]}>
          <Input placeholder="https://..." />
        </Form.Item>

        <ButtonGroup>
          {isEdit && (
            <Popconfirm 
              title="Удалить?" 
              onConfirm={() => user?.id && remove(user.id)} 
              okText="Да" 
              disabled={isLoading}
            >
              <Button danger loading={isLoading}>Удалить</Button>
            </Popconfirm>
          )}
          <Button onClick={onClose} disabled={isLoading}>Отмена</Button>
          <Button type="primary" onClick={handleSubmit} loading={isLoading}>
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};