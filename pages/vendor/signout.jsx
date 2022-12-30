import React, { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/router';

// or you could have a conditionall check to signout() if not signedin on signin page

function signout() {
  const { signOut } = useClerk();
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push('/vendor/signin')
  });
  return <div>Redirecting to signin</div>;
}

export default signout;
