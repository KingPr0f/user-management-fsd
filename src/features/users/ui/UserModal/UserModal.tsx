import React, { useEffect } from 'react';
import { Popconfirm } from 'antd'; 
import { Modal, Form, Input, Button } from 'shared/ui'; 
import { useCreateUser, useUpdateUser, useDeleteUser } from '../../model';
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
  const isEdit = !!user;

 
  const { mutate: create } = useCreateUser();
  const { mutate: update } = useUpdateUser();
  const { mutate: remove } = useDeleteUser();

  
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
      const cleanData = { 
        name: values.name.trim(), 
        avatar: values.avatar.trim() 
      };
      
      if (isEdit && user) { 
        
        update({ id: user.id, data: cleanData }); 
      } else {
        create(cleanData);
      }

      
      onClose(); 
    } catch (e) {
      
      console.error('Validation failed:', e);
    }
  };

  const handleDelete = () => {
    if (user?.id) {
      remove(user.id);
      onClose(); 
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={isEdit ? 'Редактирование' : 'Создание'}
      footer={null}
      destroyOnClose
      forceRender
    >
      <Form form={form} layout="vertical">
        {isEdit && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}
        
        <Form.Item 
          name="name" 
          label="Имя" 
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input placeholder="Иван" />
        </Form.Item>
        
        <Form.Item 
          name="avatar" 
          label="Аватар" 
          rules={[
            { required: true, message: 'Введите ссылку на фото' }, 
            { type: 'url', message: 'Введите корректный URL' }
          ]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <ButtonGroup>
          {isEdit && (
            <Popconfirm 
              title="Удалить этого пользователя?" 
              onConfirm={handleDelete} 
              okText="Да" 
              cancelText="Нет"
            >
              <Button danger>Удалить</Button>
            </Popconfirm>
          )}
          <Button onClick={onClose}>Отмена</Button>
          <Button 
            type="primary" 
            onClick={handleSubmit}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};