import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function AlertMessage({ alert, onReset, isModal, lifespanInMs }) {
  useEffect(() => {
    const id = setTimeout(onReset, lifespanInMs);
    return () => {
      clearTimeout(id);
    };
  }, [alert.timeStamp]);

  const messageColor = alert.isError ? 'alert-error' : 'alert-success';
  const alertClass = `text-center text-sm text-white`;
  const backgroundColor = alert.isError
    ? 'bg-red-400'
    : 'bg-emerald-400';
  const divClass = isModal
    ? `fixed w-1/3 rounded drop-shadow mx-auto bottom-0 left-0 right-0 m-3 p-1 ${backgroundColor}`
    : `alert-container ${backgroundColor}`;

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
  isModal: PropTypes.bool,
  lifespanInMs: PropTypes.number,
};

AlertMessage.defaultProps = {
  alert: {
    message: '',
    isError: false,
    timeStamp: 0,
  },
  isModal: false,
  lifespanInMs: 7000,
};

export default AlertMessage;
