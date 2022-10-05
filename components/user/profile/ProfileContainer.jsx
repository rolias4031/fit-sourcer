import React from 'react';
import PropTypes from 'prop-types';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from './ProfileHeader';
import DeleteUserContainer from './DeleteUserContainer';
import { useGetUserProfile } from '../../../lib/queries';
import EditBodyContainer from './EditBodyContainer';
import { useFilterProfile } from '../../../lib/hooks';

/*
* this container does these things:
1. fetches the user's profile with the useGetProfile hook.
2. renders the other containers in the profile page & controls their visibility
3. passes the profile down the tree
*/

function ProfileContainer() {
  // onSuccess you need to: compare the tables in this with hardcoded tables. If the profile is missing a table, send a mutation to create it.
  const { isLoading, isError, data: profile, error } = useGetUserProfile();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError messsage={error.message} />;
  }

  if (profile) {
    
    // filter profile into a map to EditBodyContainer dynamic
    const bodyMap = useFilterProfile(profile)
    return (
      <div className="m-5">
        <ProfileHeader />
        <div className="lg:w-1/2 md:w-3/4 w-5/6 mx-auto mb-10">
          <EditBodyContainer map={bodyMap} />
        </div>
        <div className="lg:w-1/2 md:w-3/4 w-5/6 mx-auto mb-10">
          <DeleteUserContainer />
        </div>
      </div>
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
