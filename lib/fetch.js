/* eslint-disable import/prefer-default-export */
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AlertContext } from '../context/AlertContext';

const initClients = () => {
  const queryClient = useQueryClient();
  const alertContext = useContext(AlertContext);
  return { queryClient, alertContext };
};

// dont use try/catch with useMutation, bc that 'handles' the error and returns a successful mutation.
// mutateWithInputs is fetch function for basic POST/PUT mutations.
async function mutateWithInputs(config) {
  const fetchOptions = {
    method: config.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: config.inputs }),
  };
  const response = await fetch(config.url, fetchOptions);
  const result = await response.json();
  if (!response.ok || !(response.status in { 200: null, 201: null })) {
    throw new Error(result.message);
  }
  return result;
}

export const useEditBody = () => {
  const { queryClient, alertContext } = initClients();
  return useMutation(mutateWithInputs, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetch-profile');
    },
    onError: (data, variables) => {
      alertContext.updateAlert(
        data.message,
        variables.alertLocId
      );
    },
  });
};


export const useDeleteUser = () => {
  const { queryClient, alertContext } = initClients();
  return useMutation(mutateWithInputs, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (data, variables) => {
      alertContext.updateAlert(data.message, variables.alertLocId);
    },
  });
};

/*
function to abstract general fetch and alert system, use this when you have a POST, PUT, DELETE, or other request that just takes a simple body object, turns it into JSON, and then returns and error or success message from the server.

requires conf = {
  fetchUrl, method, inputs: {}, message, redirectUrl, timeoutTime (ms)
},
alert context instance,
router instance for router.push()
*/
export async function requestWithAlert(conf, context, router = null) {
  const fetchOptions = {
    method: conf.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: conf.inputs }),
  };
  try {
    const response = await fetch(conf.fetchUrl, fetchOptions);
    const result = await response.json();
    if (!response.ok || !(response.status in { 200: null, 201: null })) {
      throw new Error(result.message);
    }
    context.updateAlert(result.message, false, conf.alertLoc);
    if (conf.redirect) {
      setTimeout(() => {
        router.push(conf.redirectUrl);
      }, conf.timeoutTime);
    }
  } catch (error) {
    context.updateAlert(error.message, true, conf.alertLoc);
  }
}
