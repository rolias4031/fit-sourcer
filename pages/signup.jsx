import React from 'react';
import SignupContainer from '../components/auth/container/SignupContainer';
import Header from '../components/display/Header';
import AlertContextProvider from '../context/AlertContext';

export default function Signup() {
  return (
    <AlertContextProvider>
      <Header title="Signup" />
      <SignupContainer />
    </AlertContextProvider>
  );
}
