import React from 'react';
import { useGetVendorApps } from '../../lib/queries';
import ManageAppsPanel from './ManageAppsPanel';
import IsLoading from '../util/IsLoading';

const url = 'http://localhost:3000/api/admin/get-vendor-apps';

function ManageVendorAppsContainer() {
  const { isLoading, isError, isSuccess, data } = useGetVendorApps(url);
  if (isLoading) {
    return <IsLoading />;
  }
  if (data) {
    return <ManageAppsPanel vendorApps={data.usersWithVendorApps} />;
  }
}

export default ManageVendorAppsContainer;
