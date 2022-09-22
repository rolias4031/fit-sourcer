import React from 'react';
import PropTypes from 'prop-types';
import SuccessSymbol from './SuccessSymbol';

function FormStatus({ isLoading, isSuccess, isError, divStyle }) {
  return (
    <div className={divStyle}>
      {isLoading && <p>Loading</p>}
      {isSuccess && <SuccessSymbol />}
      {isError && <p>Error</p>}
    </div>
  );
}

FormStatus.propTypes = {
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  divStyle: PropTypes.string,
};

FormStatus.defaultProps = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  divStyle: null
};

export default FormStatus;
