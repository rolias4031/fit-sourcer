import React from 'react';
import TextInput from './TextInput';
import BootstrapContainer from '../../structure/BootstrapContainer';
import SubmitButton from './SubmitButton';

export default function SignupForm() {
  return (
    <BootstrapContainer
      config={{ contClass: 'container', rowClass: 'row', colClass: 'col' }}
    >
      <form className="form-control" action="">
        <TextInput title="Email" />
        <TextInput title="Password" />
        <TextInput title="Confirm Password" />
        <SubmitButton btnName="Signup" />
      </form>
    </BootstrapContainer>
  );
}
