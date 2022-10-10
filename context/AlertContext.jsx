import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

/*
! alert system works as follows:
* use updateAlerts by giving it an array of error messages and a locId. this will turn those messages into error objects.
* setAlerts has the form: { arr: [{ message, timeStamp }], loc: locId }
* check if an alert exists by checking alerts.loc
*/

export const AlertContext = createContext({
  alerts: {
    arr: [],
    loc: ''
  },
  updateAlerts: () => {},
  clearAlerts: () => {},
});

function AlertContextProvider({ children }) {
  const initAlertsState = { arr: [], loc: ''}
  const [alerts, setAlerts] = useState(initAlertsState)

  function updateAlerts({ messages, locId, error = true }) {
    // takes an array of messages, maps through them to create an array of alert objects, sets that is alerrts.arr
    // if messages is a single string (single error), put it into an array
    const validMessages = Array.isArray(messages) ? messages : [messages]
    const timeStamp = Date.now()
    const newAlerts = validMessages.map((message) => (
      { message, timeStamp, error, }
    ))
    setAlerts({ arr: newAlerts, loc: locId  })
  }

  function clearAlerts() {
    setAlerts(initAlertsState);
  }
  const value = useMemo(() => ({ alerts, updateAlerts, clearAlerts }));
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContextProvider;
