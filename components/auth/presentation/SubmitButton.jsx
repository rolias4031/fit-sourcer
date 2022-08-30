import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ btnName, style }) {
  return (
    <input className={`btn btn-blue my-4 ${style}`} type="submit" value={btnName} />
  );
}

SubmitButton.propTypes = {
  btnName: PropTypes.string.isRequired,
  style: PropTypes.string,
};

SubmitButton.defaultProps = {
  style: '',
};

export default SubmitButton;
