/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import UserHomeContainer from '../../components/user/container/UserContainer';

/*
contains: single container component that handles all fetching, state, props distribution.
As children to that container, there will be a home comp where users browse, search, and
do the main services. then there's the profile comp which gets opened with a state toggle,
which holds all user settings, preferences, profile stuff etc.

- this should be the only 'nice' redirect in the app. If not auth, should send back to '/',
every other page should just throw a 505 or 404 from the server side.
- uses getServerSideProps for the initial fetch, which also validates authentication. If auth,
uses the user email to fetch all other data and pre-render.
- how to handle updates? pretty sure each page re render will take care of that, but if
not then react-query should be able to. the alternative is to just get the email from
getSSP, then use react-query to get all other information.
*/

function Home({ userEmail }) {
  return <UserHomeContainer />;
}

export async function getServerSideProps(context) {
  // check session
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // fetch all data with session.user.email
    return {
      props: {
        userEmail: session.user.email,
      },
    };
  }
  // if !session, then redirect to index page.
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default Home;
