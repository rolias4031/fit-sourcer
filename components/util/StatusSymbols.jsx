import React from 'react';
import PropTypes from 'prop-types';
import LoadingSymbol from './LoadingSymbol';
import SuccessSymbol from './SuccessSymbol';
import ErrorSymbol from './ErrorSymbol';

function StatusSymbols({ loading, success, error }) {
  return (
    <>
      {loading && <LoadingSymbol />}
      {success && <SuccessSymbol />}
      {error && <ErrorSymbol />}
    </>
  );
}

StatusSymbols.propTypes = {
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

StatusSymbols.defaultProps = {
  loading: false,
  success: false,
  error: false
}



export default StatusSymbols;
