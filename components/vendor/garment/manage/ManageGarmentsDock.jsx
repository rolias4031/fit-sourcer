import React from 'react';
import ManageGarmentsList from './ManageGarmentsList';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError'
import { useAllVendorGarments } from '../../../../lib/vendor/hooks';

function ManageGarmentsDock() {
  const { vendorData, allGarments, isLoading, isError } = useAllVendorGarments();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError />
  }

  if (vendorData) {
    console.log(vendorData);
    return (
      <ManageGarmentsList
        allGarments={allGarments}
      />
    );
  }
}

export default ManageGarmentsDock;
