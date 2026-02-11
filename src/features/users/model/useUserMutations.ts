import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userApi } from 'entities/user/api'; 
import { USER_QUERY_KEY } from 'shared/consts';

export const useUserMutations = (onSuccessCallback?: () => void) => {
  // QueryClient нужен, чтобы управлять кэшем данных (списком пользователей)
  const queryClient = useQueryClient();

  // Общая функция успеха: показывает уведомление и обновляет список
  const onSuccess = (message: string) => {
    notification.success({ message });
    // invalidateQueries заставляет React Query заново загрузить список пользователей с сервера
    queryClient.invalidateQueries(USER_QUERY_KEY);
    // Вызываю коллбек (например, закрытие модалки), если он был передан
    if (onSuccessCallback) onSuccessCallback();
  };

  // Мутация создания
  const createMutation = useMutation(userApi.create, {
    onSuccess: () => onSuccess('Пользователь создан'),
  });

  // Мутация обновления
  const updateMutation = useMutation(
    ({ id, data }: { id: string; data: any }) => userApi.update(id, data),
    {
      onSuccess: () => onSuccess('Пользователь обновлен'),
    }
  );

  // Мутация удаления
  const deleteMutation = useMutation(userApi.delete, {
    onSuccess: () => onSuccess('Пользователь удален'),
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    // Единый флаг загрузки: если хоть что-то грузится, блокируем интерфейс
    isLoading: createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
  };
};