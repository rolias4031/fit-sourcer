/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import UserProfileContainer from '../../components/user/container/UserProfileContainer';

function profile({ userInfo }) {
  return <UserProfileContainer info={userInfo}/>;
}

profile.propTypes = {
  userInfo: PropTypes.exact({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    primaryEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export const getServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const { sessionId, userId } = req.auth;
    if (!sessionId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const primaryEmail = req.user.emailAddresses.find(
      (email) => email.id === req.user.primaryEmailAddressId,
    );
    const userInfo = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      primaryEmail: primaryEmail.emailAddress,
      userId,
    };
    return {
      props: {
        userInfo,
      },
    };
  },
  { loadUser: true },
);

export default profile;
