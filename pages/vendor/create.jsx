import React from 'react';
import { getAuth, buildClerkProps, clerkClient } from '@clerk/nextjs/server';
import { getUserRole } from '../../lib/util';
import CreateGarmentDock from '../../components/vendor/garment/create/CreateGarmentDock';
import { APP_URLS, USER_ROLES } from '../../lib/constants';

function create() {
  return <CreateGarmentDock />;
}

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  const thisUser = await getUserRole(userId);
  if (thisUser.role !== USER_ROLES.vendor) {
    return {
      redirect: {
        destination: APP_URLS.vendorSignout,
        permanent: false,
      },
    };
  }
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const userInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    userId,
  };
  return { props: { ...buildClerkProps(req, { userInfo }) } };
}

export default create;
