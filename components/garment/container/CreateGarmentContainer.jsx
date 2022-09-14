import React, { useState, useCallback } from 'react';
import GeneralButton from '../../form/GeneralButton';
import SelectGarmentTypeForm from '../presentation/SelectGarmentTypeForm';

/*
 * GARMENT_TYPE influences fields. As new garment types get created, must add corresponding fields.
* the create flow uses the stageState to control component appearance. Stages go 1 -> 2 -> 3. A submit button takes the place of the next button at stage 3.
 */

const INIT_STAGE = 1

const GARMENT_TYPES = {
  pant: 'pant',
  short: 'pant',
};

function CreateGarmentContainer() {
  const [stage, setStage] = useState(INIT_STAGE);
  const [type, setType] = useState(GARMENT_TYPES.pant);

  console.log(stage, type)

  const stageHandler = useCallback((buttonName) => {
    if (buttonName === 'back') {
      setStage((prevState) => {
        if (prevState === 1) return prevState
        return prevState - 1
      })
    }
    else if (buttonName === 'next') {
      setStage((prevState) => (prevState + 1))
    }
  })

  console.log(type, stage);
  return (
    <>
      <SelectGarmentTypeForm
        garmentTypes={GARMENT_TYPES}
        raiseState={setType}
      />
      <GeneralButton name="back" btnStyle="btn-gray" onClick={stageHandler} />
      <GeneralButton name="next" btnStyle="btn-blue" onClick={stageHandler} />
    </>
  );
}

export default CreateGarmentContainer;
