/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';

async function fetchUserProfile() {
  const url = 'http://localhost:3000/api/user/get-profile';
  const fetchOptions = {
    method: 'GET',
  };
  const response = await fetch(url, fetchOptions);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  console.log(result);
  return result.profile;
}

export const useGetUserProfile = () =>
  useQuery(['get-user-profile'], fetchUserProfile);
