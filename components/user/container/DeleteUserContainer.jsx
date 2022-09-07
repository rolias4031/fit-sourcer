import React, { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../../display/Header';
import DeleteUserForm from '../presentation/DeleteUserForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { fetchAndAlert } from '../../../lib/fetch';
/*
- contains all fetch logic for the DeleteUserForm
*/
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
    }
    fetchAndAlert(config, alertContext, router)
  });
  return (
    <>
      <Header title="Delete your profile" />
      <DeleteUserForm deleteHandler={deleteHandler} />
      {alertContext.alert.message ? <Alert alert={alertContext.alert} /> : null}
    </>
  );
}

export default DeleteUserContainer;
