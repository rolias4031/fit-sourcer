import React from 'react';
import PropTypes from 'prop-types';
import AlertMessage from './AlertMessage';

function Alert({ alerts, onReset, isModal }) {
  let alertContent = null
  if (alerts.length > 0) {
    alertContent = alerts.map((alert) => (
      <AlertMessage
        key={`${alert.message}-${alert.timeStamp}`}
        alert={alert}
        onReset={onReset}
        isModal={isModal}
      />
    ));
  }

  return <div className='fixed mx-auto bottom-0 left-0 right-0'>{alertContent}</div>;
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
