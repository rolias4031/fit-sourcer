import React from 'react';
import { getAuth, buildClerkProps, clerkClient } from '@clerk/nextjs/server';
import { getUserRole } from '../../lib/util';
import ManageGarmentsDock from '../../components/vendor/garment/manage/ManageGarmentsDock';
import { COMMON_URLS, USER_ROLES } from '../../lib/constants';

function manage() {
  return <ManageGarmentsDock />;
}

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  // vendor check, redirect if fail to signout -> signin
  const thisUser = await getUserRole(userId);
  if (thisUser.role !== USER_ROLES.vendor) {
    return {
      redirect: {
        destination: COMMON_URLS.vendorSignout,
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

export default manage;
