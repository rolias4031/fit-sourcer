import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInputState from './TextInputState';
import SubmitButton from './SubmitButton';
import FlexRow from '../../structure/FlexRow';
import PasswordInputs from './PasswordInputs';

function SignupForm({ signupHandler }) {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  };
  const [inputValues, setInputValues] = useState(initialState);

  function passwordsDontMatch(pw, conf) {
    if (pw === conf) return false;
    return true;
  }

  function enableSubmitBtn(inputs) {
    // function returns true to signal error/disabled/invalid
    const inputCheck = Object.keys(inputs).map((input) => {
      if (inputs[input].length <= 0) return false;
      return true;
    });
    if (inputCheck.includes(false)) return true;
    return passwordsDontMatch(inputs.password, inputs.confirm);
  }

  function handler(event) {
    event.preventDefault();
    signupHandler();
  }

  return (
    <form
      onSubmit={handler}
      className="bg-gray-100 w-8/12 mx-auto my-10 p-10 rounded-md"
    >
      <FlexRow>
        <TextInputState
          setInputValues={setInputValues}
          id="firstName"
          title="First Name"
        />
        <TextInputState
          setInputValues={setInputValues}
          id="lastName"
          title="Last Name"
        />
      </FlexRow>
      <TextInputState
        setInputValues={setInputValues}
        id="email"
        title="Email"
      />
      <PasswordInputs
        setInputValues={setInputValues}
        passwordsDontMatch={passwordsDontMatch(
          inputValues.password,
          inputValues.confirm,
        )}
      />
      <SubmitButton
        title="Signup"
        name="signup"
        disabled={enableSubmitBtn(inputValues)}
      />
    </form>
  );
}

SignupForm.propTypes = {
  signupHandler: PropTypes.func.isRequired,
};

export default SignupForm;
