import React from 'react';
import { Modal } from 'shared/ui'; 
import { User } from 'entities/user/types';
import { UserModalForm } from './UserModalForm';
import { useUserModalLogic } from './useUserModalLogic';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const UserModal: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props;
  
  const { form, isEdit, handleSubmit, handleDelete } = useUserModalLogic(props);

  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose} 
      title={isEdit ? 'Редактирование' : 'Создание'} 
      footer={null}  
      forceRender
    >
      <UserModalForm 
        form={form} 
        isEdit={isEdit} 
        onDelete={handleDelete} 
        onCancel={onClose} 
        onSubmit={handleSubmit} 
      />
    </Modal>
  );
};