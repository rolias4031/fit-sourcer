import React from 'react';
import { useQuery } from 'react-query';
import UserHome from '../presentation/UserHome';
import IsLoading from '../../util/IsLoading';
import IsError from '../../util/IsError';

async function fetchUserProfile() {
  const url = 'http://localhost:3000/api/user/profile';
  const fetchOptions = {
    method: 'GET',
  };
  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error('custom');
  }
  const data = await response.json();
  return data.profile;
}

export const useProfile = () => useQuery(['profile'], fetchUserProfile);

function UserHomeContainer() {
  const { isLoading, isError, data: profile, error } = useProfile();

  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError message={error.message} />;
  }
  return <UserHome profile={profile} />;
}

export default UserHomeContainer;
