import React, { useState, useCallback } from 'react';
import GeneralButton from '../../form/GeneralButton';
import GeneralContainer from '../../structure/GeneralContainer';
import GarmentInfoForm from '../presentation/GarmentInfoForm';
import GarmentTypeForm from '../presentation/GarmentTypeForm';
import GarmentMeasurementsForm from '../presentation/GarmentMeasurementsForm';

/*
 * GARMENT_TYPE influences fields. As new garment types get created, must add corresponding fields.
 * the create flow uses the stageState to control component appearance. Stages go 1 -> 2 -> 3. A submit button takes the place of the next button at stage 3.
 */

const INIT_STAGE = 1;

const GARMENT_TYPES = {
  pant: 'pant',
  short: 'pant',
};

function CreateGarmentContainer() {
  const [stage, setStage] = useState(INIT_STAGE);
  const [type, setType] = useState(GARMENT_TYPES.pant);
  const [infoValues, setInfoValues] = useState({
    name: null,
    vendor: null,
    description: null,
  });

  const stageHandler = useCallback((buttonName) => {
    if (buttonName === 'back') {
      setStage((prevState) => {
        if (prevState === 1) return prevState;
        return prevState - 1;
      });
    } else if (buttonName === 'next') {
      setStage((prevState) => prevState + 1);
    }
  });

  function renderFormContent(stage, type) {
    let content;
    if (stage === 1) {
      content = (
        <GarmentTypeForm
          id="createForm-select-garment-type"
          garmentTypes={GARMENT_TYPES}
          raiseState={setType}
        />
      );
    } else if (stage === 2) {
      content = <GarmentInfoForm raiseState={setInfoValues} />;
    } else if (stage === 3) {
      content = <GarmentMeasurementsForm />;
    }
    return content;
  }

  return (
    <GeneralContainer contStyle="w-1/2 mx-auto rounded-md">
      {renderFormContent(stage, type)}
      <div className="text-right">
        <GeneralButton
          name="back"
          btnStyle="btn-gray mx-2"
          onClick={stageHandler}
        />
        <GeneralButton name="next" btnStyle="btn-blue" onClick={stageHandler} />
      </div>
    </GeneralContainer>
  );
}

export default CreateGarmentContainer;
