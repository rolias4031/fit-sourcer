import React, { useCallback, useContext } from 'react';
import { AlertContext } from '../../context/AlertContext';
import { ALERT_LOC_IDS } from '../../lib/constants';
import { useSimpleMutation } from '../../lib/mutations';
import Alert from '../alert/Alert';
import CreateAdminForm from './CreateAdminForm';

function CreateAdminContainer() {
  const alertCtx = useContext(AlertContext);
  const { mutate, isLoading, isError, isSuccess } = useSimpleMutation();
  const createAdminHandler = useCallback(async (formValues) => {
    const config = {
      url: 'http://localhost:3000/api/admin/create',
      method: 'POST',
      inputs: formValues,
    };
    mutate(config, {
      onSettled: (data, error) => {
        console.log({ data, error });
        console.log('settled');
        alertCtx.updateAlerts({
          messages: error ? error.errors : data.display,
          locId: ALERT_LOC_IDS.CREATE_ADMIN_CONTAINER,
          error: error && true
        })
      },
    });
  });

  return (
    <>
      <CreateAdminForm onSubmit={createAdminHandler} />
      <Alert locId={ALERT_LOC_IDS.CREATE_ADMIN_CONTAINER} />
    </>
  );
}

export default CreateAdminContainer;
