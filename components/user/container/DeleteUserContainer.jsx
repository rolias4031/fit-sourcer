import React, { useCallback, useContext } from 'react';
import Header from '../../display/Header';
import DeleteUserForm from '../presentation/DeleteUserForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { useDeleteUser } from '../../../lib/fetch';
import Redirect from '../../util/Redirect';
import { alertLocIds } from '../../../lib/constants';
/*
- contains all fetch logic for the DeleteUserForm
*/

function DeleteUserContainer() {
  const alertContext = useContext(AlertContext);
  const { mutate, isLoading, isSuccess } = useDeleteUser();

  const deleteHandler = useCallback(async (deleteInputs) => {
    const config = {
      url: 'http://localhost:3000/api/auth/delete-user',
      method: 'DELETE',
      inputs: deleteInputs,
      alertLocId: alertLocIds.DELETE_USER_CONTAINER
    };
    mutate(config);
  });

  if (isLoading) {
    return <h1>Deleting</h1>;
  }
  if (isSuccess) {
    return <Redirect to="/deleted" />;
  }

  return (
    <>
      <Header title="Delete your profile" />
      <DeleteUserForm deleteHandler={deleteHandler} />
      {alertContext.alert.loc === alertLocIds.DELETE_USER_CONTAINER ? (
        <Alert alert={alertContext.alert} />
      ) : null}
    </>
  );
}

export default DeleteUserContainer;
