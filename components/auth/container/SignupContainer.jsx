import React, { useCallback } from 'react';
import SignupForm from '../presentation/SignupForm';

function SignupContainer() {
  const signupHandler = useCallback(async () => {
  });

  return <SignupForm signupHandler={signupHandler} />;
}

export default SignupContainer;
