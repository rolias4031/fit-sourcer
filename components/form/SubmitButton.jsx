import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ title, name, id, styles, disabled }) {
  return (
    <input
      className={styles.button}
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
  styles: PropTypes.exact({
    button: PropTypes.string
  }),
  name: PropTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  styles: {
    button: ''
  },
  name: null,
};

export default SubmitButton;
