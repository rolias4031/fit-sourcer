import React from 'react';
import ManageGarmentsList from './ManageGarmentsList';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError'
import { useAllVendorGarments } from '../../../../lib/vendor/hooks';

function ManageGarmentsDock() {
  const { vendorData, allGarments, status } = useAllVendorGarments();

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
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
