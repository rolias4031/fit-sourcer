/* eslint-disable arrow-body-style */

// built for ref use, not state. Perhaps built another TextInput component for state.
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const TextInputRef = forwardRef(({ title }, ref) => {
  return (
    <>
      <label className="form-label" htmlFor={title}>
        {title}
      </label>
      <input
        ref={ref}
        className="form-control form-control-sm"
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
