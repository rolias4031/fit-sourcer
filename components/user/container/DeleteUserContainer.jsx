import React, { useCallback, useContext } from 'react';
import SubHeader from '../../display/SubHeader';
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
    <div className="lg:w-1/2 md:w-3/4 w-5/6 mx-auto mb-10">
      <div className="flex mx-auto items-center">
        <SubHeader header="Delete Your Profile" />
      </div>
      <DeleteUserForm deleteHandler={deleteHandler} />
      {alerts.loc === alertLocIds.DELETE_USER_CONTAINER ? (
        <Alert alerts={alerts} />
      ) : null}
    </div>
  );
}

export default DeleteUserContainer;
