import React from 'react';
import ProfileHeader from '../presentation/ProfileHeader';
import { useProfile } from './UserContainer';

function ProfileContainer() {
  const { isLoading, isError, data: prof, error } = useProfile();
  return <ProfileHeader />;
}

export default ProfileContainer;
