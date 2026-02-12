import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from 'shared/consts';
import { userApi } from 'entities/user/api';

export const useUsersList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: userApi.getAll,
  });

  const sortedUsers = useMemo(() => {
    if (!data) return [];
    
    
    return [...data].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);

  return {
    users: sortedUsers,
    isLoading,
    isError,
    isEmpty: !isLoading && sortedUsers.length === 0,
  };
};