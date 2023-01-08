import { useState, useMemo } from 'react';

/* eslint-disable import/prefer-default-export */
export const useFilterProfileMeasurements = (profile) => {
  const {
    id: lowerId,
    userId: lowerUserId,
    updatedAt: lowerUpdatedAt,
    ...lowerNums
  } = profile?.lowerBody;

  const {
    id: upperId,
    userId: upperUserId,
    updatedAt: upperUpdatedAt,
    ...upperNums
  } = profile?.upperBody;

  const bodyMap = new Map([
    [
      'lower',
      { nums: lowerNums, updatedAt: lowerUpdatedAt, param: 'lowerBody' },
    ],
    [
      'upper',
      { nums: upperNums, updatedAt: upperUpdatedAt, param: 'upperBody' },
    ],
  ])

  return bodyMap;
};

export const useAlerts = () => {
  class Alert {
    constructor(message, isError = true) {
      this.message = message;
      this.timeStamp = Date.now();
      this.isError = isError;
    }
  }
  // reqErrors = [{ message(string), error(bool), timestamp(string) }]
  const [alerts, setAlerts] = useState([]);
  const resetAlerts = () => {
    setAlerts(() => []);
  };

  const createAlerts = (messages, isError = true) => {
    // loop through returned errors, creating timestamps and pushing to array that gets set to setAlerts
    // error format = { message, timestamp, error(bool) }
    // error.error === false means its not an error, will display differently.
    const rawAlerts = Array.isArray(messages) ? messages : [messages];
    const formattedAlerts = rawAlerts.map((alert) => new Alert(alert, isError));
    setAlerts(() => formattedAlerts);
  };

  const handleForeignAlert = (customMsg, error = null) => {
    // try to grab error props
    const message = error.message ? error.message : customMsg;
    const formattedAlert = new Alert(message, true);
    setAlerts(() => [formattedAlert]);
  };

  return { alerts, resetAlerts, createAlerts, handleForeignAlert };
};
