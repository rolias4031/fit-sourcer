import React, { useState, useCallback } from 'react';
import GarmentTypeForm from './GarmentTypeForm';
import GarmentInfoForm from './GarmentInfoForm';
import GarmentMeasurementsForm from './GarmentMeasurementsForm';
import GeneralButton from '../../form/GeneralButton';
import SubmitButton from '../../form/SubmitButton';

const GARMENT_TYPES = {
  pant: 'pant',
  short: 'pant',
};
const INIT_STAGE = 1;

const typeKeysMap = new Map([
  ['pant', ['waist', 'hip', 'seat', 'thigh', 'inseam', 'calf', 'outseam']],
  ['short', ['waist', 'hip', 'seat', 'thigh', 'inseam']],
]);

function CreateGarmentForm({ createHandler }) {
  // current stage of create flow
  const [stage, setStage] = useState(INIT_STAGE);
  // current type of garment selected
  const [type, setType] = useState(GARMENT_TYPES.pant);
  // garment info
  const [infoValues, setInfoValues] = useState({
    name: null,
    vendor: null,
    description: null,
  });
  // use the typeKeysMap to init measurement values. loop over array to create keys in obj.
  const initMeasurementValues = {};
  typeKeysMap.get(type).forEach((key) => {
    initMeasurementValues[key] = '0';
  });
  const [measurementValues, setMeasurementValues] = useState(initMeasurementValues)
  // handles stage change when clicking the back and next buttons. controls formContent.
  const changeStageHandler = useCallback((buttonName) => {
    if (buttonName === 'back') {
      setStage((prevState) => {
        if (prevState === 1) return prevState;
        return prevState - 1;
      });
    } else if (buttonName === 'next') {
      setStage((prevState) => prevState + 1);
    }
  });
  // renders main form content based on the current stage (1,2,3)
  function renderFormContent(curStage) {
    let content;
    if (curStage === 1) {
      content = (
        <GarmentTypeForm
          id="createForm-select-garment-type"
          garmentTypes={GARMENT_TYPES}
          raiseState={setType}
        />
      );
    } else if (curStage === 2) {
      content = <GarmentInfoForm raiseState={setInfoValues} />;
    } else if (curStage === 3) {
      content = (
        <GarmentMeasurementsForm
          typeKeys={typeKeysMap.get(type)}
          stateValues={measurementValues}
          raiseState={setMeasurementValues}
        />
      );
    }
    return content;
  }

  const formClass = 'w-1/2 p-5 my-5 rounded-md mx-auto bg-gray-100';
  return (
    <form className={formClass} onSubmit={createHandler}>
      {renderFormContent(stage)}
      <div className="text-right my-5">
        <GeneralButton
          name="back"
          btnStyle="btn-gray mx-2"
          onClick={changeStageHandler}
        />
        {stage === 3 ? (
          <SubmitButton
            title="Create Garment"
            id="create-garment-submit"
            btnStyle="btn-blue"
            disabled={false}
          />
        ) : (
          <GeneralButton
            name="next"
            btnStyle="btn-blue"
            onClick={changeStageHandler}
          />
        )}
      </div>
    </form>
  );
}

export default CreateGarmentForm;
