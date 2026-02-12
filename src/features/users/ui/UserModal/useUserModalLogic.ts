import { useEffect } from 'react';
import { Form } from 'antd';
import { User } from 'entities/user/types';
import { useCreateUser, useUpdateUser, useDeleteUser } from 'features/users/model';

interface UseUserModalLogicProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const useUserModalLogic = ({ isOpen, onClose, user }: UseUserModalLogicProps) => {
  const [form] = Form.useForm();
  const isEdit = !!user;

  const { mutate: create } = useCreateUser();
  const { mutate: update } = useUpdateUser();
  const { mutate: remove } = useDeleteUser();

  useEffect(() => {
    if (isOpen) {
      user ? form.setFieldsValue(user) : form.resetFields();
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
      console.error('Validation error:', e);
    }
  };

  const handleDelete = () => {
    if (user?.id) {
      remove(user.id);
      onClose();
    }
  };

  return {
    form,
    isEdit,
    handleSubmit,
    handleDelete,
  };
};