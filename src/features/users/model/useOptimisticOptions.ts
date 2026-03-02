import { notification } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEY } from 'shared/consts';
import { User } from 'entities/user/types';

export interface OptimisticContext {
  previousUsers: User[] | undefined;
}

export const useOptimisticOptions = (successMessage: string = 'Операция выполнена') => {
  const queryClient = useQueryClient();

  return {
    onMutate: async (_variables: unknown): Promise<OptimisticContext> => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      const previousUsers = queryClient.getQueryData<User[]>(USER_QUERY_KEY);
      return { previousUsers };
    },

    onError: (err: Error, _variables: unknown, context: OptimisticContext | undefined) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers);
      }
      notification.error({ message: 'Ошибка', description: err.message });
    },

    onSuccess: () => {
      notification.success({ message: successMessage });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  };
};
