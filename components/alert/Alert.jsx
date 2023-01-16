import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertMessage from './AlertMessage';
import StatusSymbols from './StatusSymbols';

function Alert({ status, alerts, onReset, isModal }) {
  let alertContent = null
  if (alerts.length > 0) {
    console.log({alerts});
    alertContent = alerts.map((alert) => (
      <AlertMessage
        key={`${alert.message}-${alert.timeStamp}`}
        alert={alert}
        onReset={onReset}
        isModal={isModal}
      />
    ));
  }

  return alertContent;
}

Alert.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.exact({
      message: PropTypes.string,
      timeStamp: PropTypes.number,
      isError: PropTypes.bool,
    }),
  ),
  onReset: PropTypes.func.isRequired,
  isModal: PropTypes.bool
};

Alert.defaultProps = {
  alerts: [],
  isModal: false
};

export default React.memo(Alert);
