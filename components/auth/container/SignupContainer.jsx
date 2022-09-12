import React, { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import SignupForm from '../presentation/SignupForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { requestWithAlert } from '../../../lib/fetch';

const alertLocId = 'ALERT-SIGNUP'

function SignupContainer() {
  const router = useRouter();
  const alertContext = useContext(AlertContext);
  const signupHandler = useCallback(async (inputValues) => {
    const config = {
      fetchUrl: 'http://localhost:3000/api/auth/signup',
      method: 'POST',
      inputs: inputValues,
      redirectUrl: '/api/auth/signin',
      timeoutTime: 3000,
      alertLoc: alertLocId
    }
    requestWithAlert(config, alertContext, router)
  })

  return (
    <>
      <SignupForm signupHandler={signupHandler} />
      {alertContext.alert.loc === alertLocId ? <Alert alert={alertContext.alert} /> : null}
    </>
  );
};

export default SignupContainer;
