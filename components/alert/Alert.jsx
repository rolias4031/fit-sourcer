import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AlertMessage from './AlertMessage';

function Alert({ alerts, onReset, isModal }) {
  let alertsContent = <div>HI</div>;
  if (alerts.length > 0) {
    const alertMessages = alerts.map((alert) => (
      <AlertMessage
        key={`${alert.message}-${alert.timeStamp}`}
        alert={alert}
        onReset={onReset}
        isModal={isModal}
      />
    ));
    alertsContent = <>{alertMessages}</>
  }

  return alertsContent;
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
