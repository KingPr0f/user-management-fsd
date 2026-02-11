import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userApi } from 'entities/user/api'; // Предполагаем, что api там
import { USER_QUERY_KEY } from 'shared/consts';

export const useUserMutations = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const onSuccess = (message: string) => {
    notification.success({ message });
    queryClient.invalidateQueries(USER_QUERY_KEY);
    if (onSuccessCallback) onSuccessCallback();
  };

  const createMutation = useMutation(userApi.create, {
    onSuccess: () => onSuccess('Пользователь создан'),
  });

  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => userApi.update(id, data),
    {
      onSuccess: () => onSuccess('Пользователь обновлен'),
    }
  );

  const deleteMutation = useMutation(userApi.delete, {
    onSuccess: () => onSuccess('Пользователь удален'),
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isLoading: createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
  };
};