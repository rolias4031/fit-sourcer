import React, { useContext, useCallback } from 'react';
import CreateGarmentForm from '../presentation/CreateGarmentForm';
import Alert from '../../alert/Alert'
import { useCreateGarment } from '../../../lib/fetch';
import { alertLocIds } from '../../../lib/constants';
import { AlertContext } from '../../../context/AlertContext';

/*
 * GARMENT_TYPE influences fields. As new garment types get created, must add corresponding fields.
 * the create flow uses the stageState to control component appearance. Stages go 1 -> 2 -> 3. A submit button takes the place of the next button at stage 3.
 */

function CreateGarmentContainer() {
  const { alerts } = useContext(AlertContext);
  const { mutate, isLoading, isError, data } = useCreateGarment();

  const createHandler = useCallback(async (garmentInfo, garmentNums) => {
    const config = {
      url: 'http://localhost:3000/api/garment/create',
      method: 'POST',
      inputs: { garmentInfo, garmentNums },
      alertLocId: alertLocIds.CREATE_GARMENT_CONTAINER,
    };
    mutate(config);
  });
  return (
    <>
      <CreateGarmentForm createHandler={createHandler} />
      {alerts.loc === alertLocIds.CREATE_GARMENT_CONTAINER ? (
        <Alert alerts={alerts} />
      ) : null}
    </>
  );
}

export default CreateGarmentContainer;
