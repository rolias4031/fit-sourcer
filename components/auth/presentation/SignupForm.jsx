import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInputState from '../../form/TextInputState';
import SubmitButton from '../../form/SubmitButton';
import FlexRow from '../../structure/FlexRow';

export function enableSubmitBtn(inputs) {
  // function returns true to signal error/disabled/invalid
  const inputCheck = Object.keys(inputs).map((input) => {
    if (inputs[input].length <= 0 || inputs[input] === false) return false;
    return true;
  });
  if (inputCheck.includes(false)) return true;
  return false;
}

function SignupForm({ signupHandler }) {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const [inputValues, setInputValues] = useState(initialState);

  async function submitHandler(event) {
    event.preventDefault();
    await signupHandler(inputValues);
  }

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-100 w-8/12 mx-auto mt-10 p-10 rounded-md"
    >
      <FlexRow>
        <TextInputState
          raiseState={setInputValues}
          id="firstName"
          title="First Name"
        />
        <TextInputState
          raiseState={setInputValues}
          id="lastName"
          title="Last Name"
        />
      </FlexRow>
      <TextInputState raiseState={setInputValues} id="email" title="Email" />
      <SubmitButton
        title="Signup"
        id="signup-button"
        btnStyle="btn-blue"
        disabled={enableSubmitBtn(inputValues)}
      />
    </form>
  );
}

SignupForm.propTypes = {
  signupHandler: PropTypes.func.isRequired,
};

export default SignupForm;
