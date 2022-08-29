import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ btnName }) {
  return <input className="btn btn-primary btn-sm" type="submit" value={btnName} />;
}

SubmitButton.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default SubmitButton;
