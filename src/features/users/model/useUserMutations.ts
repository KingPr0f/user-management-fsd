import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';
import { USER_QUERY_KEY } from 'shared/consts';

export const useUserMutations = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const onSettled = (message?: string) => {
    queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    if (message) notification.success({ message });
    if (onSuccessCallback) onSuccessCallback();
  };

  
  const deleteMutation = useMutation({
    mutationFn: userApi.delete,
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

    
      const previousUsers = queryClient.getQueryData(USER_QUERY_KEY);

      
      queryClient.setQueryData(USER_QUERY_KEY, (old: User[] | undefined) => 
        old ? old.filter((user) => user.id !== deletedId) : []
      );

      return { previousUsers };
    },
    
    onError: (err, newTodo, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers);
      }
      notification.error({ message: 'Не удалось удалить' });
    },
    onSettled: () => onSettled('Пользователь удален'),
  });

 
  const createMutation = useMutation({
    mutationFn: userApi.create,
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      
      const previousUsers = queryClient.getQueryData(USER_QUERY_KEY);

      queryClient.setQueryData(USER_QUERY_KEY, (old: User[] | undefined) => {
       
        const optimisticUser: User = {
          ...newUser,
          id: 'temp-' + Date.now(),
          createdAt: new Date().toISOString(),
          avatar: newUser.avatar || '', 
        };
        
        return old ? [optimisticUser, ...old] : [optimisticUser];
      });

      return { previousUsers };
    },
    onError: (err, newTodo, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers);
      }
      notification.error({ message: 'Не удалось создать' });
    },
    onSettled: () => onSettled('Пользователь создан'),
  });

 
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => userApi.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      
      const previousUsers = queryClient.getQueryData(USER_QUERY_KEY);

      queryClient.setQueryData(USER_QUERY_KEY, (old: User[] | undefined) => 
        old?.map((user) => (user.id === id ? { ...user, ...data } : user))
      );

      return { previousUsers };
    },
    onError: (err, newTodo, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers);
      }
      notification.error({ message: 'Не удалось обновить' });
    },
    onSettled: () => onSettled('Пользователь обновлен'),
  });

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    remove: deleteMutation.mutateAsync,
    isLoading: createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
  };
};