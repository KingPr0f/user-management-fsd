import { useMutation } from '@tanstack/react-query';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { useOptimisticOptions } from './useOptimisticOptions';

export const useDeleteUser = () => {
  const options = useOptimisticOptions('Пользователь удален');

  return useMutation({
    mutationFn: userApi.delete,
    onMutate: (deletedId) => options.onMutate((old: User[] | undefined) => 
      old ? old.filter((user) => user.id !== deletedId) : []
    ),
    onError: options.onError,
    onSettled: options.onSettled,
  });
};