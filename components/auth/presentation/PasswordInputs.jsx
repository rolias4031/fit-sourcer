import React from 'react';
import PropTypes from 'prop-types';

function PasswordInputs({ passwordsDontMatch, setInputValues }) {
  const inputClass = 'shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const labelClass = 'text-gray-700 text-sm';
  const error = "Passwords don't match";
  const toggleClass = passwordsDontMatch ? null : 'invisible';
  const errorClass = `mt-3 mb-0 text-left text-xs text-red-500 ${toggleClass}`;

  function changeHandler(event) {
    const { value } = event.target;
    const { id } = event.target;
    setInputValues((prevState) => {
      const newState = { ...prevState, [id]: value };
      return newState;
    });
  }

  return (
    <>
      <label className={labelClass} htmlFor="password">
        Password
        <input
          onChange={changeHandler}
          className={inputClass}
          type="password"
          id="password"
        />
      </label>
      <label className={labelClass} htmlFor="confirm">
        Confirm
        <input
          onChange={changeHandler}
          className={inputClass}
          type="password"
          id="confirm"
        />
      </label>
      <p className={errorClass}>{error}</p>
    </>
  );
}

PasswordInputs.propTypes = {
  setInputValues: PropTypes.func.isRequired,
  passwordsDontMatch: PropTypes.bool.isRequired,
};

export default PasswordInputs;
