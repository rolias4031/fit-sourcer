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
      <div className="flex">
        <div className="flex flex-col basis-1/4 h-screen p-3 place-items-end border-r">
          <ProfileTabs
            stateValue={curTab}
            raiseState={setCurTab}
            tabOptions={tabs}
          />
        </div>
        <div className="basis-full px-10 py-5">
          {curTab === 'measurements' ? (
            <div className="flex flex-col gap-3 w-min">
              <EditBodyDock userMsmntMap={userMsmntMap} />
            </div>
          ) : curTab === 'manage' ? (
            <>
              <div className="my-5">
                <VendorAppDock />
              </div>
              <div className="my-5">
                <DeleteUserDock />
              </div>
            </>
          ) : null}
        </div>
      </div>
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
