import React from 'react';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from '../presentation/ProfileHeader';
import DeleteUserContainer from './DeleteUserContainer';
import { useProfile } from './UserContainer';

function ProfileContainer() {
  const { isLoading, isError, data: prof, error } = useProfile();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError messsage={error.message} />;
  }
  // create a EditUserContainer
  return (
    <>
      <ProfileHeader />
      <DeleteUserContainer />
    </>
  );
}

export default ProfileContainer;
