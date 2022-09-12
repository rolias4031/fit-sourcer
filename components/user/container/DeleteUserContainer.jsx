import React, { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../../display/Header';
import DeleteUserForm from '../presentation/DeleteUserForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { requestWithAlert } from '../../../lib/fetch';
/*
- contains all fetch logic for the DeleteUserForm
*/
const alertLocId = 'ALERT_DELETE_USER_CONTAINER'
function DeleteUserContainer() {
  const router = useRouter();
  const alertContext = useContext(AlertContext);
  const deleteHandler = useCallback(async (inputValues) => {
    const config = {
      fetchUrl: 'http://localhost:3000/api/auth/delete-user',
      method: 'DELETE',
      inputs: inputValues,
      redirectUrl: '/',
      timeoutTime: 1000,
      alertLoc: alertLocId
    }
    requestWithAlert(config, alertContext, router)
  });
  return (
    <>
      <Header title="Delete your profile" />
      <DeleteUserForm deleteHandler={deleteHandler} />
      {alertContext.alert.loc === alertLocId ? <Alert alert={alertContext.alert} /> : null}
    </>
  );
}

export default DeleteUserContainer;
