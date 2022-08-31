import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AlertContext } from '../../context/AlertContext';

function Alert({ alert }) {
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    const id = setTimeout(alertContext.clearAlert, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [alert.timeStamp]);

  const messageColor = alert.error ? 'text-red-700' : 'text-green-500';
  const alertClass = `text-sm text-center ${messageColor}`;

  return (
    <div className="my-4 bg-red-100 w-8/12 py-1 mx-auto rounded-md">
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
