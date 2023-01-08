import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IsError from '../../util/IsError';
import IsLoading from '../../util/IsLoading';
import ProfileTabs from './ProfileTabs';
import { useGetUserProfile } from '../../../lib/queries';
import EditBodyDock from './EditBodyDock';
import { useFilterProfileMeasurements } from '../../../lib/hooks';
import VendorAppDock from './VendorAppDock';
import DeleteUserDock from './DeleteUserDock';

const tabs = ['measurements', 'manage'];

function ProfileDock() {
  const [curTab, setCurTab] = useState(tabs[0]);
  const { data: profile, status, error } = useGetUserProfile();

  if (status === 'success') {
    // filter profile into a map to EditBodyDock dynamic
    const userMsmntMap = useFilterProfileMeasurements(profile);

    return (
      <>
        <div className="flex justify-end space-x-3 my-5 border-b">
          <ProfileTabs
            stateValue={curTab}
            raiseState={setCurTab}
            tabOptions={tabs}
          />
        </div>
        <div className="">
          {curTab === 'measurements' ? (
            <EditBodyDock userMsmntMap={userMsmntMap} />
          ) : curTab === 'manage' ? (
            <>
              <div className='my-5'>
                <VendorAppDock />
              </div>
              <div className='my-5'>
                <DeleteUserDock />
              </div>
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
