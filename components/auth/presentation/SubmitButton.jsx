import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, name, disabled }) {
  return (
    <input
      className="btn btn-blue mt-3 mb-4"
      type="submit"
      value={title}
      name={name}
      disabled={disabled}
    />
  );
}

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SubmitButton;
