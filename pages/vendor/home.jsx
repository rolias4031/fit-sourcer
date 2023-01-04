/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { getAuth, buildClerkProps, clerkClient } from '@clerk/nextjs/server';
import PageHeader from '../../components/vendor/display/PageHeader'
import { getUserRole } from '../../lib/util';
import { APP_URLS, COMMON_URLS, USER_ROLES } from '../../lib/constants';

/*
 * this page should have a custom signin page bc it needs to check for admin status.
 */

function Home({ __clerk_ssr_state }) {
  console.log(__clerk_ssr_state.userInfo);
  return (
    <div>
      <PageHeader text="Home" />
    </div>
  );
}

Home.propTypes = {
  __clerk_ssr_state: PropTypes.shape({
    userInfo: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  // vendor check, redirect if fail to signout -> signin
  const thisUser = await getUserRole(userId)
  if (thisUser.role !== USER_ROLES.vendor) {
    return {
      redirect: {
        destination: APP_URLS.vendorSignout,
        permanent: false,
      }
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

export default Home;

// getServerSideProps to redirect to /signin if no authenticated
