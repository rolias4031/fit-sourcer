/* eslint-disable camelcase */
import React from 'react';
import { getAuth, buildClerkProps, clerkClient } from '@clerk/nextjs/server';
import ProfileDock from '../../components/user/profile/ProfileDock';
import PageContainer from '../../components/structure/PageContainer';

/*
* this container does these things:
1. performs SSR and protects page with session check
2. renders the ProfileContainer
3. passes userInfo props down to tree
*/

function profile({ __clerk_ssr_state }) {
  return (
    <PageContainer style="border">
      <ProfileDock info={__clerk_ssr_state.userInfo} />
    </PageContainer>
  );
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

export default profile;
