import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileHeader from './ProfileHeader';
import ToggleProfilePage from './ToggleProfilePage';
import DeleteUserContainer from './DeleteUserContainer';
import { useGetUserProfile } from '../../../lib/queries';
import EditBodyContainer from './EditBodyContainer';
import { useFilterProfile } from '../../../lib/hooks';
import VendorAppContainer from './VendorAppContainer';

const tabs = ['measurements', 'manage'];

function ProfileContainer() {
  const [curTab, setCurTab] = useState(tabs[0]);
  const { isLoading, isError, data: profile, error } = useGetUserProfile();

  if (profile) {
    // filter profile into a map to EditBodyContainer dynamic
    const bodyMap = useFilterProfile(profile);
    return (
      <div className="m-5">
        <ToggleProfilePage
          stateValue={curTab}
          raiseState={setCurTab}
          tabOptions={tabs}
        />
        <div>
          {curTab === 'measurements' ? (
            <EditBodyContainer map={bodyMap} />
          ) : curTab === 'manage' ? (
            <div>hi</div>
          ) : null}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError messsage={error.message} />;
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
