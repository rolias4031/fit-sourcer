import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function AlertMessage({ alert, onReset }) {
  useEffect(() => {
    const id = setTimeout(onReset, 7000);
    return () => {
      clearTimeout(id);
    };
  }, [alert.timeStamp]);

  const messageColor = alert.isError ? 'alert-error' : 'alert-success';
  const alertClass = `alert ${messageColor}`;
  const backgroundColor = alert.isError
    ? 'alert-container-error'
    : 'alert-container-success';
  const divClass = `alert-container ${backgroundColor}`;

  return (
    <div className={divClass}>
      <p className={alertClass}>{alert.message}</p>
    </div>
  );
}

AlertMessage.propTypes = {
  alert: PropTypes.exact({
    message: PropTypes.string,
    isError: PropTypes.bool,
    timeStamp: PropTypes.number,
  }),
  onReset: PropTypes.func.isRequired,
};

AlertMessage.defaultProps = {
  alert: {
    message: '',
    isError: false,
    timeStamp: 0,
  },
};

export default AlertMessage;
