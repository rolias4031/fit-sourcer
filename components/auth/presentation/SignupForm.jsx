import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ST8_KEYS } from '../../../lib/constants';
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
    [ST8_KEYS.firstName]: '',
    [ST8_KEYS.lastName]: '',
    [ST8_KEYS.email]: '',
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
          id="signup-first-name"
          name={ST8_KEYS.firstName}
        />
        <TextInputState
          raiseState={setInputValues}
          id="signup-last-name"
          name={ST8_KEYS.lastName}
        />
      </FlexRow>
      <TextInputState
        raiseState={setInputValues}
        id="signup-email"
        name={ST8_KEYS.email}
      />
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
