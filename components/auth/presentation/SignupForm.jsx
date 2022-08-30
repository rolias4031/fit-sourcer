import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TextInputRef from './TextInputRef';
import SubmitButton from './SubmitButton';
import FlexRow from '../../structure/FlexRow';

function SignupForm({ signupHandler }) {
  const emailRef = useRef();
  const pwRef = useRef();
  const confirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  function handler(event) {
    event.preventDefault();
    // client side validation (not empty, passwords match)
    const refs = {
      email: emailRef.current.value,
      pw: pwRef.current.value,
      confirm: confirmRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
    signupHandler(refs);
  }
  return (
    <form
      onSubmit={handler}
      className="bg-gray-100 w-8/12 mx-auto my-10 p-10 rounded-md"
      action=""
    >
      <FlexRow>
        <TextInputRef ref={firstNameRef} title="First Name" />
        <TextInputRef ref={lastNameRef} title="LastName" />
      </FlexRow>
      <TextInputRef ref={emailRef} title="Email" />
      <TextInputRef ref={pwRef} title="Password" />
      <TextInputRef ref={confirmRef} title="Confirm Password" />
      <SubmitButton btnName="Signup" />
    </form>
  );
}

SignupForm.propTypes = {
  signupHandler: PropTypes.func.isRequired,
};

export default SignupForm;
