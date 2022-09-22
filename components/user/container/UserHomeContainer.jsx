import React from 'react';
import PropTypes from 'prop-types'
import UserHome from '../presentation/UserHome';
import IsLoading from '../../util/IsLoading';
import IsError from '../../util/IsError';
import { useGetUserProfile } from '../../../lib/fetch'

/*
* this container does these things:
1. fetch's the user's profile using useGetUserProfile hook
*/

function UserHomeContainer({ info }) {
  const { isLoading, isError, data: profile, error } = useGetUserProfile();

  if (isLoading) {
    return <IsLoading />;
  }
  if (isError) {
    return <IsError message={error.message} />;
  }
  return <UserHome profile={profile} info={info}/>;
}

UserHomeContainer.propTypes = {
  info: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryEmail: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired
}

export default UserHomeContainer;
