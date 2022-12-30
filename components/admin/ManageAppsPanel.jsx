/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import AppCard from './AppCard';
import SubHeader from '../display/SubHeader';
import { useSimpleMutation } from '../../lib/mutations';

function ManageAppsPanel({ vendorApps }) {
  console.log(vendorApps);

  // * mutation to approve the vendor profile and deny
  const { mutate, isLoading, isError, isSuccess } = useSimpleMutation();
  const queryClient = useQueryClient()
  const submitHandler = useCallback((formValues) => {
    const config = {
      method: 'POST',
      inputs: formValues,
      url: 'http://localhost:3000/api/admin/manage-apps',
    };
    mutate(config, {
      onSuccess: () => {
        queryClient.invalidateQueries(['get-vendor-apps']);
      },
    });
  });

  // * map through vendorApps to create AppCards
  const apps = vendorApps.map((app) => {
    return (
      <AppCard key={app.vendorProfile.id} app={app} onSubmit={submitHandler} />
    );
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
