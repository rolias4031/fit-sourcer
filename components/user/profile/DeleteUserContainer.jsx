import React, { useCallback, useContext } from 'react';
import SubHeader from '../../display/SubHeader';
import DeleteUserForm from './DeleteUserForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { useDeleteUser } from '../../../lib/mutations';
import Redirect from '../../util/Redirect';
import { alertLocIds } from '../../../lib/constants';
/*
- contains all fetch logic for the DeleteUserForm
*/

function DeleteUserContainer() {
  const { alerts } = useContext(AlertContext);
  const { mutate, isLoading, isSuccess } = useDeleteUser();

  const deleteHandler = useCallback(async (deleteInputs) => {
    const config = {
      url: 'http://localhost:3000/api/auth/delete-user',
      method: 'DELETE',
      inputs: deleteInputs,
      alertLocId: alertLocIds.DELETE_USER_CONTAINER,
    };
    mutate(config);
  });

  if (isSuccess) {
    return <Redirect to="/deleted" />;
  }

  return (
    <>
      <div className="flex mx-auto my-1 items-center">
        <SubHeader header="Delete Your Profile" headerStyle="" />
      </div>
      <DeleteUserForm deleteHandler={deleteHandler} />
      {alerts.loc === alertLocIds.DELETE_USER_CONTAINER ? (
        <Alert alerts={alerts} />
      ) : null}
    </>
  );
}

export default DeleteUserContainer;
