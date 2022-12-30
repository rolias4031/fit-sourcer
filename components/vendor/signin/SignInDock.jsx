import React, { useCallback, useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useSimpleMutation } from '../../../lib/vendor/mutations';
import { baseUrl } from '../../../lib/constants';
import SignInForm from './SignInForm';
import EmailCodeInput from './EmailCodeInput';
import StatusSymbols from '../../util/StatusSymbols';
import { useAlerts } from '../../../lib/vendor/hooks';
import Alert from '../alert/Alert';

function SignInDock() {
  const [renderCodeInput, setRenderCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const { alerts, resetAlerts, createAlerts, handleForeignAlert } = useAlerts();
  const { mutate } = useSimpleMutation();
  const { signIn } = useSignIn();
  const router = useRouter();
  const sendCodeHandler = useCallback(async () => {
    setIsLoading(() => true);
    mutate(
      {
        method: 'POST',
        url: `${baseUrl}/api/vendor/vendor-check`,
        inputs: formValues,
      },
      {
        onSuccess: async (data) => {
          // always throws a 422 status error after working one time.
          try {
            await signIn.create({
              identifier: formValues.email,
            });
            await signIn.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: data.emailAddressId,
            });
            setRenderCodeInput(() => true);
          } catch (error) {
            handleForeignAlert('Something went wrong', error);
          }
        },
        onError: (data) => {
          // display error
          createAlerts(data.errors);
        },
        onSettled: () => {
          setIsLoading(() => false);
        },
      },
    );
  });

  // authHandler for verifying code input
  const authHandler = useCallback(async (emailCode) => {
    setIsLoading(() => true);
    try {
      await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: emailCode,
      });
      createAlerts('Success', false);
      router.reload()
    } catch (error) {
      // handle foreign error
      handleForeignAlert('Code is incorrect or expired', error);
    } finally {
      setIsLoading(() => false);
    }
  });

  return (
    <>
      {renderCodeInput ? (
        <EmailCodeInput onAuth={authHandler} onResend={sendCodeHandler} />
      ) : (
        <SignInForm
          onSubmit={sendCodeHandler}
          contState={formValues}
          raiseState={setFormValues}
        />
      )}
      <div className="text-center my-2">
        <StatusSymbols loading={isLoading} />
      </div>
      <Alert alerts={alerts} onReset={resetAlerts} />
    </>
  );
}

export default SignInDock;
