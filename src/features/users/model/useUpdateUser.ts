import { useMutation } from '@tanstack/react-query';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { useOptimisticOptions } from './useOptimisticOptions';

export const useUpdateUser = () => {
  const options = useOptimisticOptions('Пользователь обновлен');

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.update(id, data),
    onMutate: ({ id, data }) => options.onMutate((old: User[] | undefined) => 
      old?.map((user) => (user.id === id ? { ...user, ...data } : user))
    ),
    onError: options.onError,
    onSettled: options.onSettled,
  });
};