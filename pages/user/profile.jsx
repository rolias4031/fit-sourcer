/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import ProfileContainer from '../../components/user/container/ProfileContainer';

/*
* this container does these things:
1. performs SSR and protects page with session check
2. renders the ProfileContainer
3. passes userInfo props down to tree
*/

function profile({ userInfo }) {
  return <ProfileContainer info={userInfo} />;
}

profile.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
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
