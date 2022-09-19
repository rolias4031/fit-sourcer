import React from 'react';
import Layout from '../components/util/Layout';
import SignupContainer from '../components/auth/container/SignupContainer';

/*
contains: landing page content -> signup form, navbar with links
- all redirects get routed here for unauthenticated. don't assume that people want to
just sign in, but rather also signup. Then they click links for signin, etc.
- only place where useSession() should be used, I think.
*/

export default function Home() {
  return <SignupContainer />;
}

// ssr would take care of auth troubles with 
