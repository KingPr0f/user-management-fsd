import React, { useEffect } from 'react';
import { Popconfirm } from 'antd'; 
import { Modal, Form, Input, Button } from 'shared/ui'; 
import { useUserMutations } from '../../model/useUserMutations';
import { User } from 'entities/user/types';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null; // Если user есть — это редактирование. Если null — создание.
}

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

export const UserModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
  // Создаю инстанс формы Ant Design
  const [form] = Form.useForm();
  // Достаю методы изменения данных из своего хука
  const { create, update, remove, isLoading } = useUserMutations(onClose);
  // Флаг: мы редактируем или создаем?
  const isEdit = !!user;

  // Эффект: при открытии модалки заполняем форму данными пользователя или очищаем её
  useEffect(() => {
    if (isOpen && user) {
        form.setFieldsValue(user); // Заполняем поля (имя, аватар)
    } else {
        form.resetFields(); // Очищаем поля для нового создания
    }
  }, [isOpen, user, form]);

  // Обработчик сохранения формы
  const handleSubmit = async () => {
    try {
      // Валидируем поля (проверяем, что они не пустые)
      const values = await form.validateFields();
      // Очищаем пробелы по краям
      const cleanData = { name: values.name.trim(), avatar: values.avatar.trim() };
      
      if (isEdit && user) { 
        // Если редактируем — вызываем update с ID пользователя
        await update({ id: user.id, data: cleanData }); 
      } else {
        // Если создаем — вызываем create только с данными
        await create(cleanData);
      }
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      open={isOpen}
      // Если идет загрузка, запрещаем закрывать окно, чтобы не прервать запрос
      onCancel={!isLoading ? onClose : undefined}
      title={isEdit ? 'Редактирование' : 'Создание'}
      footer={null} // Убираю стандартный футер, использую свой ButtonGroup
    >
      <Form form={form} layout="vertical" disabled={isLoading}>
        {/* Показываю ID только при редактировании (он read-only) */}
        {isEdit && <Form.Item label="ID" name="id"><Input disabled /></Form.Item>}
        
        <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
          <Input placeholder="Иван" />
        </Form.Item>
        
        <Form.Item name="avatar" label="Аватар" rules={[{ required: true }, { type: 'url' }]}>
          <Input placeholder="https://..." />
        </Form.Item>

        <ButtonGroup>
          {/* Кнопку удаления показываю только при редактировании */}
          {isEdit && (
            <Popconfirm 
              title="Удалить?" 
              onConfirm={() => {
                if (user && user.id) {
                  remove(user.id);
                }
              }} 
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