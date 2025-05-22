import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAuthCheck } from '../apis/Auth/authCheck';

const AUTH_STALE_TIME = 1000 * 60 * 60;
const AUTH_GC_TIME = Infinity;

const useUser = () => {
  const cachedUsername = localStorage.getItem('username');

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['auth', 'check'],
    queryFn: getAuthCheck,
    staleTime: AUTH_STALE_TIME,
    gcTime: AUTH_GC_TIME,
    retry: 0,
  });

  const { username: newUsername } = data || {};

  //
  //
  //
  React.useEffect(() => {
    if (newUsername && newUsername !== cachedUsername) {
      localStorage.setItem('username', newUsername);
    }
  }, [newUsername, cachedUsername]);

  //
  //
  //
  React.useEffect(() => {
    if (cachedUsername && isError) {
      localStorage.removeItem('username');

      window.location.reload();
    }
  }, [isError, cachedUsername]);

  return {
    isLogin: !!cachedUsername || !!newUsername,
    isLoading: isPending,
    username: newUsername || cachedUsername || null,
    refetch,
  };
};

export default useUser;
