import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { AlertContext } from '../../context/AlertContext';

function AlertMessage({ alert }) {
  const alertCtx = useContext(AlertContext);

  useEffect(() => {
    const id = setTimeout(alertCtx.clearAlerts, 7000);
    return () => {
      clearTimeout(id);
    };
  }, [alert.timeStamp]);

  const messageColor = alert.error ? 'alert-error' : 'alert-success';
  const alertClass = `alert ${messageColor}`;
  const backgroundColor = alert.error
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
    locId: PropTypes.string,
    error: PropTypes.bool,
    timeStamp: PropTypes.number.isRequired,
  }),
};

AlertMessage.defaultProps = {
  alert: {
    message: '',
    locId: '',
    error: false,
    timeStamp: 0,
  },
};

export default AlertMessage;
