import React, { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import PageHeader from '../../components/vendor/display/PageHeader';
import SignInDock from '../../components/vendor/signin/SignInDock';

/*
 * this page should have a custom signin page bc it needs to check for admin status.
 */

// * somehow distinguish between a sign in refresh and a middleware redirect? get the role and then have a check on every page?

function SignIn() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push('/vendor/home')
    }
  })

  return (
    <>
      <div className="text-center my-5">
        <PageHeader text="Vendor Sign In" />
      </div>
      <div className="lg:w-1/3 md:w-1/2 mx-auto my-5">
        <SignInDock />
      </div>
    </>
  );
}

export default SignIn;
