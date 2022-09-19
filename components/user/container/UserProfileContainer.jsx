import React from 'react';
import PropTypes from 'prop-types'
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from '../presentation/ProfileHeader';
import DeleteUserContainer from './DeleteUserContainer';
import EditUserContainer from './EditUserContainer';
import { useProfile } from './UserHomeContainer';

function UserProfileContainer() {
  const { isLoading, isError, data: profile, error } = useProfile();
  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError messsage={error.message} />;
  }

  if (profile) {
    return (
      <>
        <ProfileHeader />
        <EditUserContainer profile={profile} />
        <DeleteUserContainer />
      </>
    );
  }
}

UserProfileContainer.propTypes = {
  info: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryEmail: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
}

export default UserProfileContainer;
