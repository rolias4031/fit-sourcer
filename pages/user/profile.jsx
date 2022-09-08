/* eslint-disable camelcase */
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import UserProfileContainer from '../../components/user/container/UserProfileContainer';
import { authOptions } from '../api/auth/[...nextauth]';

function profile({ prop }) {
  return <UserProfileContainer />;
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    return {
      props: {
        prop: 'data',
      },
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default profile;
