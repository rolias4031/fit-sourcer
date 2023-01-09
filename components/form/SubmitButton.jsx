import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, name, id, style, disabled }) {
  const btnClass = `btn ${style}`;
  return (
    <input
      className={btnClass}
      type="submit"
      value={title}
      name={name}
      id={id}
      disabled={disabled}
    />
  );
}

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  name: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  disabled: false,
  style: null,
};

export default SubmitButton;
