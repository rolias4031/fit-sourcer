import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export const AlertContext = createContext({
  alert: '',
  updateAlert: () => {},
  clearAlert: () => {},
});

function AlertContextProvider({ children }) {
  const initialAlertState = {
    message: '',
    error: false,
    timeStamp: 0,
  };
  const [alert, setAlert] = useState(initialAlertState);
  function updateAlert(message, error) {
    const timeStamp = Date.now();
    setAlert({ message, error, timeStamp });
  }
  function clearAlert() {
    setAlert(initialAlertState);
  }
  const value = useMemo(() => ({ alert, updateAlert, clearAlert }));
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContextProvider;
