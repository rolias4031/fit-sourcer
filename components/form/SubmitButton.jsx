import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, id, btnStyle, disabled }) {
  const btnClass = `btn ${btnStyle}`;
  return (
    <input
      className={btnClass}
      type="submit"
      value={title}
      id={id}
      disabled={disabled}
    />
  );
}

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  btnStyle: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
