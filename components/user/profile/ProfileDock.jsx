import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileTabs from './ProfileTabs';
import { useGetUserProfile } from '../../../lib/queries';
import EditBodyContainer from './EditBodyContainer';
import { useFilterProfileMeasurements } from '../../../lib/hooks';
import VendorAppContainer from './VendorAppContainer';
import DeleteUserContainer from './DeleteUserContainer';

const tabs = ['measurements', 'manage'];

function ProfileDock() {
  const [curTab, setCurTab] = useState(tabs[0]);
  const { data: profile, status, error } = useGetUserProfile();

  if (status === 'success') {
    // filter profile into a map to EditBodyContainer dynamic
    const userMsmntMap = useFilterProfileMeasurements(profile);

    return (
      <>
        <div className="flex justify-end space-x-3 my-2 border-b">
          <ProfileTabs
            stateValue={curTab}
            raiseState={setCurTab}
            tabOptions={tabs}
          />
        </div>
        <div className="">
          {curTab === 'measurements' ? (
            <EditBodyContainer userMsmntMap={userMsmntMap} />
          ) : curTab === 'manage' ? (
            <>
              <VendorAppContainer />
              <DeleteUserContainer />
            </>
          ) : null}
        </div>
      </>
    );
  }

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError messsage={error.message} />;
  }
}

ProfileDock.propTypes = {
  info: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryEmail: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default ProfileDock;
