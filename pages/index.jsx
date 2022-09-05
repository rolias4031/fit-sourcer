import React from 'react';
import { useSession } from 'next-auth/react';
import LandingPage from '../components/index/LandingPage';
import Redirect from '../components/util/Redirect';

/*
contains: landing page content -> signup form, navbar with links
- all redirects get routed here for unauthenticated. don't assume that people want to
just sign in, but rather also signup. Then they click links for signin, etc.
- only place where useSession() should be used, I think.
*/

export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    return <Redirect to="/user/home" />;
  }

  if (status === 'loading') {
    return <h1>Loading</h1>;
  }

  return <LandingPage />;
}
