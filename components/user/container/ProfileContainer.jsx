import React from 'react';
import PropTypes from 'prop-types';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from '../presentation/ProfileHeader';
import DeleteUserContainer from './DeleteUserContainer';
import { useGetUserProfile } from '../../../lib/fetch';
import EditLowerBodyContainer from './EditLowerBodyContainer';

/*
* this container does these things:
1. fetches the user's profile with the useGetProfile hook.
2. renders the other containers in the profile page & controls their visibility
3. passes the profile down the tree
*/

function ProfileContainer() {
  const { isLoading, isError, data: profile, error } = useGetUserProfile();
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
        <EditLowerBodyContainer lowerBody={profile.lowerBody}/>
        <DeleteUserContainer />
      </>
    );
  }
}

ProfileContainer.propTypes = {
  info: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryEmail: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default ProfileContainer;
