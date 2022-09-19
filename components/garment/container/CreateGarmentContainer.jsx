import React, { useState, useCallback } from 'react';
import CreateGarmentForm from '../presentation/CreateGarmentForm';

/*
 * GARMENT_TYPE influences fields. As new garment types get created, must add corresponding fields.
 * the create flow uses the stageState to control component appearance. Stages go 1 -> 2 -> 3. A submit button takes the place of the next button at stage 3.
 */


function CreateGarmentContainer() {

  const createHandler = useCallback(async () => {
    //
  })
  return (
    <CreateGarmentForm/>
  );
}

export default CreateGarmentContainer;
