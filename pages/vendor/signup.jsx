import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { baseUrl } from '../../lib/constants'

function signup() {
  return (
    <div className=''>
      <p>Vendor SignUp</p>
      <SignUp afterSignUpUrl={`${baseUrl}/vendor/application`}/>
    </div>
  );
}

export default signup;
