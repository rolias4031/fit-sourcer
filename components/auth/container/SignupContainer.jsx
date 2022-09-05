import React, { useCallback, useContext } from 'react';
import SignupForm from '../presentation/SignupForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';

function SignupContainer() {
  const alertContext = useContext(AlertContext);
  const url = 'api/signup';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const signupHandler = useCallback(async (inputs) => {
    fetchOptions.body = JSON.stringify({
      inputs,
    });
    try {
      const response = await fetch(url, fetchOptions);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      alertContext.updateAlert(error.message, true);
    }
  });

  return (
    <>
      <SignupForm signupHandler={signupHandler} />
      { alertContext.alert.message ? <Alert alert={alertContext.alert} /> : null }
    </>
  );
}

export default SignupContainer;
