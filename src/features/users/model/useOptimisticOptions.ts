import { useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { User } from 'entities/user/types';
import { USER_QUERY_KEY } from 'shared/consts';

export const useOptimisticOptions = (successMessage: string) => {
  const queryClient = useQueryClient();

  return {
    onMutate: async (updater: (old: User[] | undefined) => User[] | undefined) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      const previousUsers = queryClient.getQueryData(USER_QUERY_KEY);
      queryClient.setQueryData(USER_QUERY_KEY, updater);
      return { previousUsers };
    },
    onError: (err: any, variables: any, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUsers);
      }
      notification.error({ message: 'Ошибка при выполнении операции' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      notification.success({ message: successMessage });
    },
  };
};