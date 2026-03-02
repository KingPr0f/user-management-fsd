import { Form } from 'antd';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from 'shared/consts';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { useOptimisticOptions, OptimisticContext } from '../../model/useOptimisticOptions';

interface UseUserModalLogicProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const useUserModalLogic = ({ isOpen, onClose, user }: UseUserModalLogicProps) => {
  const [form] = Form.useForm();
  const isEdit = !!user;
  const optimisticOptions = useOptimisticOptions();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen) {
      if (isEdit && user) {
        form.setFieldsValue(user);
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, isEdit, user, form]);

  const createUserMutation = useMutation<
    User,
    Error,
    Omit<User, 'id' | 'createdAt'>,
    OptimisticContext
  >({
    mutationFn: userApi.create,
    ...optimisticOptions,
  });

  const updateUserMutation = useMutation<
    User,
    Error,
    { id: string; data: Partial<User> },
    OptimisticContext
  >({
    mutationFn: ({ id, data }) => userApi.update(id, data),
    ...optimisticOptions,
  });

  const deleteUserMutation = useMutation<User, Error, string, OptimisticContext>({
    mutationFn: userApi.delete,
    ...optimisticOptions,
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (isEdit && user) {
        updateUserMutation.mutate(
          { id: user.id, data: values },
          {
            onSuccess: (updatedUser) => {
              queryClient.setQueryData<User[]>(USER_QUERY_KEY, (old) =>
                old ? old.map((u) => (u.id === updatedUser.id ? updatedUser : u)) : [],
              );
              onClose();
            },
          },
        );
      } else {
        createUserMutation.mutate(values, {
          onSuccess: (newUser) => {
            queryClient.setQueryData<User[]>(USER_QUERY_KEY, (old) =>
              old ? [...old, newUser] : [newUser],
            );
            onClose();
            form.resetFields();
          },
        });
      }
    });
  };

  const handleDelete = () => {
    if (user) {
      deleteUserMutation.mutate(user.id, {
        onSuccess: () => {
          queryClient.setQueryData<User[]>(USER_QUERY_KEY, (old) =>
            old ? old.filter((u) => u.id !== user.id) : [],
          );
          onClose();
        },
      });
    }
  };

  const isPending =
    createUserMutation.isPending || updateUserMutation.isPending || deleteUserMutation.isPending;

  return { form, isEdit, handleSubmit, handleDelete, isLoading: isPending };
};
