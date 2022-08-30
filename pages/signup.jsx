import React from 'react';
import SignupContainer from '../components/auth/container/SignupContainer';
import Header from '../components/display/Header';

export default function Signup() {
  return (
    <>
      <Header title="Signup" />
      <SignupContainer />
    </>
  );
}
