import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlertMessage from './AlertMessage';
import { AlertContext } from '../../context/AlertContext';

function Alert({ locId }) {
  const alertCtx = useContext(AlertContext);
  const { alerts } = alertCtx;
  let alertsContent = null;
  if (alerts.arr.length > 0 && locId === alerts.locId) {
    const alertMessages = alertCtx.alerts.arr.map((alert) => (
      <AlertMessage key={`${alert.message}-${alert.timeStamp}`} alert={alert} />
    ));
    alertsContent = <div>{alertMessages}</div>;
  }

  return alertsContent;
}

Alert.propTypes = {
  locId: PropTypes.string,
};

Alert.defaultProps = {
  locId: null,
};

export default Alert;
