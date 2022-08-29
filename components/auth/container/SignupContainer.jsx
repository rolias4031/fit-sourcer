import React, { useCallback } from 'react';
import SignupForm from '../presentation/SignupForm';

function SignupContainer() {
  const signupHandler = useCallback(async (refs) => {
    const {
      email, pw, confirm, firstName, lastName,
    } = refs;
    console.log(email, pw, confirm, firstName, lastName);
  });

  return <SignupForm signupHandler={signupHandler} />;
}

export default SignupContainer;
