/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { getAuth, buildClerkProps, clerkClient } from '@clerk/nextjs/server';
import UserHomeContainer from '../../components/user/home/UserHomeContainer';

/*
 * this pages needs to buy some time for the webhook to go through. useQuery with an intentional error if the !userExists, then useQuery will retry after 1 second or so. Use that custom error to display a loading page.
 */

function Home({ __clerk_ssr_state }) {
  return <UserHomeContainer info={__clerk_ssr_state.userInfo} />;
}

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  const userInfo = {
    firstName: user.firstName,
    lastName: user.lastName,
    userId,
  };
  return { props: { ...buildClerkProps(req, { userInfo }) } };
}

export default Home;
