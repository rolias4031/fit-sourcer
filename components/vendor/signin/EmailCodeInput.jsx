import React from 'react';
import PropTypes from 'prop-types';

function EmailCodeInput({ onAuth, onResend }) {
  async function changeHandler(event) {
    if (event.target.value.length !== 6) return;
    onAuth(event.target.value);
  }

  function resendHandler() {
    onResend()
  }

  return (
    <div className="p-3 bg-gray-50 border-gray-200 border rounded-md">
      <p className='label-sm label-base mb-1 text-center'>Enter the email code we just sent you</p>
      <input
        type="text"
        className="input-lg input-base w-1/2 text-center mx-auto block"
        placeholder='549332'
        onChange={changeHandler}
      />
      <button onClick={resendHandler} className="btn-sm btn-gray my-3 block mx-auto" type="button">Resend Code</button>
    </div>
  );
}

EmailCodeInput.propTypes = {
  onAuth: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default EmailCodeInput;
