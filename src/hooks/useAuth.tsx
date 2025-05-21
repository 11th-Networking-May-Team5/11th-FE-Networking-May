import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAuthCheck } from '../apis/Auth/authCheck';

const AUTH_CACHE_TIME = 1000 * 60 * 60;

const useAuth = () => {
  const cachedUsername = localStorage.getItem('username');

  const {
    data: newUsername,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['auth', 'check'],
    queryFn: getAuthCheck,
    staleTime: AUTH_CACHE_TIME,
    gcTime: AUTH_CACHE_TIME,
  });

  //
  //
  //
  React.useEffect(() => {
    if (!cachedUsername && newUsername) {
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
    username: cachedUsername || newUsername || null,
  };
};

export default useAuth;
