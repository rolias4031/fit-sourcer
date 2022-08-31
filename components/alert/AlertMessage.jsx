import React from 'react';
import PropTypes from 'prop-types';

function AlertMessage({ alert }) {
  const messageColor = alert.error ? 'text-red-500' : 'text-green-500';
  const alertClass = `text-sm text-center ${messageColor}`;

  return (
    <div className="my-3">
      <p className={alertClass}>{alert.message}</p>
    </div>
  );
}

AlertMessage.propTypes = {
  alert: PropTypes.exact({
    message: PropTypes.string,
    error: PropTypes.bool,
  }),
};

AlertMessage.defaultProps = {
  alert: {
    message: '',
    error: false,
  },
};

export default AlertMessage;
