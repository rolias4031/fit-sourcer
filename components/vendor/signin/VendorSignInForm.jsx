import React from 'react';
import PropTypes from 'prop-types';
import TextInputState from '../../form/TextInputState';
import SubmitButton from '../../form/SubmitButton';
import { disableButton } from '../../../lib/util-client';

// * a sign in form for the index page. custom sign in flow from Clerk's useSignIn().
// * checks for user.role === ADMIN before sending the email link to signin.

function VendorSignInForm({ onSubmit, contState, raiseState }) {
  function submitHandler(event) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={submitHandler} className="p-3 form-base">
      <TextInputState
        name="email"
        id="signin-input-emil"
        styles={{
          input: 'input input-base w-full',
          label: 'label label-base',
          div: '',
        }}
        curState={contState.email}
        raiseState={raiseState}
      />
      <SubmitButton
        title="Send Email Code"
        id="signin-submit"
        styles={{
          button: 'btn-sm btn-blue my-2 block ml-auto',
        }}
        disabled={disableButton(contState)}
      />
    </form>
  );
}

VendorSignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contState: PropTypes.exact({
    email: PropTypes.string,
  }).isRequired,
  raiseState: PropTypes.func.isRequired,
};

export default VendorSignInForm;
