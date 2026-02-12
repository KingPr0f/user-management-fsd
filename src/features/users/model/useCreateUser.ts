import { useMutation } from '@tanstack/react-query';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { useOptimisticOptions } from './useOptimisticOptions';

export const useCreateUser = () => {
  const options = useOptimisticOptions('Пользователь создан');

  return useMutation({
    mutationFn: userApi.create,
    onMutate: (newUser) => options.onMutate((old: User[] | undefined) => {
      const optimisticUser: User = {
        ...newUser,
        id: 'temp-' + Date.now(),
        createdAt: new Date().toISOString(),
        avatar: newUser.avatar || '',
      };
      return old ? [optimisticUser, ...old] : [optimisticUser];
    }),
    onError: options.onError,
    onSettled: options.onSettled,
  });
};