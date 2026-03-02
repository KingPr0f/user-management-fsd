import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from 'shared/consts';
import { userApi } from 'entities/user/api';
import { User } from 'entities/user/types';

export const useUsersList = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: userApi.getAll,

    select: (data: User[]) => {
      return [...data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  });

  return {
    users,
    isLoading,
    isError,
    isEmpty: !isLoading && users.length === 0,
  };
};
