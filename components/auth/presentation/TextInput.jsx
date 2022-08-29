import React from 'react';
import PropTypes from 'prop-types';

function TextInput({ title }) {
  return (
    <>
      <label className="form-label" htmlFor={title}>{title}</label>
      <input className="form-control form-control-sm" type="text" name={title} />
    </>
  );
}

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TextInput;
