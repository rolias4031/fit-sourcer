import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlertContext } from '../../context/AlertContext';

function Alert({ alert }) {
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    const id = setTimeout(alertContext.clearAlert, 7000);
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

Alert.propTypes = {
  alert: PropTypes.exact({
    message: PropTypes.string,
    error: PropTypes.bool,
    timeStamp: PropTypes.number.isRequired,
  }),
};

Alert.defaultProps = {
  alert: {
    message: '',
    error: false,
    timeStamp: 0,
  },
};

export default Alert;
