/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { withServerSideAuth } from '@clerk/nextjs/ssr';
import UserHomeContainer from '../../components/user/container/UserHomeContainer';

/*
 * this pages needs to buy some time for the webhook to go through. useQuery with an intentional error if the !userExists, then useQuery will retry after 1 second or so. Use that custom error to display a loading page.
 */

function Home({ userInfo }) {
  return <UserHomeContainer info={userInfo} />;
}

Home.propTypes = {
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

export default Home;
