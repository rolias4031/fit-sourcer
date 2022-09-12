import React from 'react';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from '../presentation/ProfileHeader';
import DeleteUserContainer from './DeleteUserContainer';
import EditUserContainer from './EditUserContainer';
import { useProfile } from './UserContainer';

function UserProfileContainer() {
  const { isLoading, isError, data: profile, error } = useProfile();
  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError messsage={error.message} />;
  }

  if (profile) {
    console.log(profile)
    return (
      <>
        <ProfileHeader />
        <EditUserContainer profile={profile}/>
        <DeleteUserContainer />
      </>
    );
  }
}

export default UserProfileContainer;
