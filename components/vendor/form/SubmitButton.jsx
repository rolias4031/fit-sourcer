import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, name, id, btnStyle, disabled }) {
  const btnClass = `btn ${btnStyle}`;
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
  btnStyle: PropTypes.string.isRequired,
  name: PropTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  name: '',
};

export default SubmitButton;
