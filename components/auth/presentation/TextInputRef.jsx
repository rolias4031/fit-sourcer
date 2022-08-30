/* eslint-disable arrow-body-style */

// built for ref use, not state. Perhaps built another TextInput component for state.
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInputRef = forwardRef(({ title }, ref) => {
  return (
    <>
      <label className=" text-gray-700 text-sm" htmlFor={title}>
        {title}
      </label>
      <input
        ref={ref}
        className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name={title}
      />
    </>
  );
});

TextInputRef.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TextInputRef;
