import React from 'react';
import VendorSignInForm from './VendorSignInForm';
import EmailCodeInput from './EmailCodeInput';
import FullStatus from '../../alert/FullStatus';
import { useVendorSignIn } from '../../../lib/hooks';
import Alert from '../../alert/Alert';

function SignInDock() {
  const {
    sendSignInCode,
    attemptSignIn,
    codeStatus,
    attemptStatus,
    alerts,
    resetAlerts,
    isCodeInput,
    formValues,
    setFormValues,
  } = useVendorSignIn();

  return (
    <>
      {isCodeInput ? (
        <>
          <EmailCodeInput onAuth={attemptSignIn} onResend={sendSignInCode} />
          <FullStatus status={attemptStatus} />
        </>
      ) : (
        <>
          <VendorSignInForm
            onSubmit={() => sendSignInCode(formValues.email)}
            contState={formValues}
            raiseState={setFormValues}
          />
          <FullStatus status={codeStatus} />
        </>
      )}
      <Alert alerts={alerts} onReset={resetAlerts} />
    </>
  );
}

export default SignInDock;
