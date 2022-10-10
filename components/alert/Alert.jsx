import React, { useContext } from 'react';
import AlertMessage from './AlertMessage';
import { AlertContext } from '../../context/AlertContext';

function Alert({ locId }) {
  const alertCtx = useContext(AlertContext);
  const { alerts } = alertCtx;
  let alertsContent = null;
  if (alerts.arr.length > 0 && locId === alerts.loc) {
    const alertMessages = alertCtx.alerts.arr.map((alert) => (
      <AlertMessage key={`${alert.message}-${alert.timeStamp}`} alert={alert} />
    ));
    alertsContent = <div>{alertMessages}</div>;
  }

  return alertsContent;
}

export default Alert;
