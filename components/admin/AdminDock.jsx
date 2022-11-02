import React from 'react';
import CreateAdminContainer from './CreateAdminContainer';
import ManageVendorAppsContainer from './ManageVendorAppsContainer';

function AdminDock() {
  return (
    <div className="lg:w-1/2 md:w-3/4 mx-auto my-5">
      <CreateAdminContainer />
      <ManageVendorAppsContainer />
    </div>
  );
}

export default AdminDock;
