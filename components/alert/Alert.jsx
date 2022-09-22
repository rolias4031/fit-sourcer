import React from 'react';
import PropTypes from 'prop-types';
import AlertMessage from './AlertMessage';

function Alert({ alerts }) {
  const alertsContent = alerts.arr.map((alert) => (
    <AlertMessage key={alert.message} alert={alert} />
  ))

  return (
    <div>
      {alertsContent}
    </div>
  );
}

Alert.propTypes = {
  alerts: PropTypes.exact({
    arr: PropTypes.arrayOf(PropTypes.exact({
      message: PropTypes.string,
      error: PropTypes.bool,
      timeStamp: PropTypes.number,
    })),
    loc: PropTypes.string,
  }).isRequired
}

export default Alert;
