/* eslint-disable camelcase */
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import ProfileContainer from '../../components/user/container/ProfileContainer';
import { authOptions } from '../api/auth/[...nextauth]';

function profile({ prop }) {
  return <ProfileContainer />;
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
