import React from 'react';
import SignupContainer from '../auth/container/SignupContainer';

function LandingPage() {
  return (
    <>
      <h1>Landing page header</h1>
      <p>A bunch of text, describing what this site does, why I made it, the purpose, etc</p>
      <SignupContainer />
    </>
  );
}

export default LandingPage;
