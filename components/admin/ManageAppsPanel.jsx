/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import AppCard from './AppCard';
import SubHeader from '../display/SubHeader';

function ManageAppsPanel({ vendorApps }) {
  console.log(vendorApps);
  // mutation to approve the vendor profile
  const apps = vendorApps.map((app) => {
    return <AppCard key={app.vendorProfile.id} app={app} />;
  });
  return (
    <>
      <SubHeader header="Pending Applications" headerStyle="my-3" />
      {apps}
    </>
  );
}

ManageAppsPanel.propTypes = {
  vendorApps: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.string,
      role: PropTypes.string,
      updatedAt: PropTypes.string,
      vendorProfile: PropTypes.objectOf(PropTypes.string),
    }),
  ).isRequired,
};

export default ManageAppsPanel;
