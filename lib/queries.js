/* eslint-disable import/prefer-default-export */
import { useQuery } from 'react-query';
import { baseUrl } from './constants';

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
  return result.profile;
}

export const useGetUserProfile = () =>
  useQuery(['get-user-profile'], fetchUserProfile);

async function basicFetch(url) {
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

export const useGetVendorApps = (url) =>
  useQuery(['get-vendor-apps'], () => basicFetch(url));

export const useGetUserRole = (enabledValue) =>
  useQuery(
    ['get-user-role'],
    () => basicFetch(`${baseUrl}/api/user/get-role`),
    {
      enabled: !!enabledValue,
    },
  );
