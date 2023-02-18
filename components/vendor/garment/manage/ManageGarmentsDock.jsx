import React from 'react';
import ManageGarments from './ManageGarments';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import { useGetVendorProfile } from '../../../../lib/vendor/queries';
import PageFrame from '../../../structure/PageFrame';

function ManageGarmentsDock() {
  const { data, status } = useGetVendorProfile();

  if (data) {
    return (
      <PageFrame>
        <ManageGarments allGarments={data.vendor.vendorProfile.garments} />
      </PageFrame>
    );
  }

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError />;
  }
}

export default ManageGarmentsDock;
