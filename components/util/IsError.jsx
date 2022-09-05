import React from 'react';
import PropTypes from 'prop-types';

function IsError({ message }) {
  const style = 'text-lg font-bold text-center my-5';
  return <h1 className={style}>{message}</h1>;
}

IsError.propTypes = {
  message: PropTypes.string.isRequired,
};

export default IsError;
