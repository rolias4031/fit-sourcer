import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, name, id, style, disabled }) {
  return (
    <input
      className={style}
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
  name: PropTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  style: null,
  name: null,
};

export default SubmitButton;
