import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TextInputRef from './TextInputRef';
import BootstrapContainer from '../../structure/BootstrapContainer';
import SubmitButton from './SubmitButton';
import Header from '../../display/Header';

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
    <BootstrapContainer
      config={{ contClass: 'container', rowClass: 'row', colClass: 'col-12' }}
    >
      <Header size={1} title="Signup" />
      <form onSubmit={handler} className="form-control" action="">
        <TextInputRef ref={firstNameRef} title="First Name" />
        <TextInputRef ref={lastNameRef} title="LastName" />
        <TextInputRef ref={emailRef} title="Email" />
        <TextInputRef ref={pwRef} title="Password" />
        <TextInputRef ref={confirmRef} title="Confirm Password" />
        <SubmitButton btnName="Signup" />
      </form>
    </BootstrapContainer>
  );
}

SignupForm.propTypes = {
  signupHandler: PropTypes.func.isRequired,
};

export default SignupForm;
