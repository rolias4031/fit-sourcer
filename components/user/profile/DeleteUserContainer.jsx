import React, { useCallback, useContext } from 'react';
import SubHeader from '../../display/SubHeader';
import DeleteUserForm from './DeleteUserForm';
import Alert from '../../alert/Alert';
import { useDeleteUser } from '../../../lib/mutations';
import Redirect from '../../util/Redirect';
import { useAlerts } from '../../../lib/hooks';
/*
- contains all fetch logic for the DeleteUserForm
*/

function DeleteUserContainer() {
  const { alerts, createAlerts, resetAlerts } = useAlerts()
  const { mutate, isLoading, isSuccess } = useDeleteUser();

  const deleteHandler = useCallback(async (deleteInputs) => {
    const config = {
      url: 'http://localhost:3000/api/auth/delete-user',
      method: 'DELETE',
      inputs: deleteInputs,
    };
    mutate(config, {
      onError: (data) => {
        createAlerts(data.errors)
      }
    })
  });

  if (isSuccess) {
    return <Redirect to="/deleted" />;
  }

  return (
    <>
      <SubHeader header="Delete Your Profile" headerStyle="my-1" />
      <DeleteUserForm deleteHandler={deleteHandler} />
      <Alert alerts={alerts} onReset={resetAlerts}/>
    </>
  );
}

export default DeleteUserContainer;
