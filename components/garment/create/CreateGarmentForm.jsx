import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';
import GarmentNumsInput from './GarmentNumsInput';
import GeneralButton from '../../form/GeneralButton';
import SubmitButton from '../../form/SubmitButton'
import GarmentInfoInput from './GarmentInfoInput';

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
    name: '',
    vendor: '',
    description: '',
  });
  // use the typeKeysMap to init measurement values. loop over array to create keys in obj.
  const initMeasurementValues = {};
  typeKeysMap.get(type).forEach((key) => {
    initMeasurementValues[key] = '0';
  });
  const [measurementValues, setMeasurementValues] = useState(
    initMeasurementValues,
  );
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

  function submitHandler(event) {
    event.preventDefault();
    createHandler({ ...infoValues, type }, measurementValues);
  }
  // renders main form content based on the current stage (1,2,3)
  function renderFormContent(curStage) {
    let content;
    if (curStage === 1) {
      content = (
        <SelectInput
          id="createForm-select-garment-type"
          name="garmentType"
          selectStyle="select-input-style-basic w-1/2"
          labelStyle="block input-label-basic"
          optionKeys={GARMENT_TYPES}
          raiseState={setType}
        />
      );
    } else if (curStage === 2) {
      content = (
        <GarmentInfoInput raiseState={setInfoValues} stateValues={infoValues} />
      );
    } else if (curStage === 3) {
      content = (
        <GarmentNumsInput
          typeKeys={typeKeysMap.get(type)}
          stateValues={measurementValues}
          raiseState={setMeasurementValues}
        />
      );
    }
    return content;
  }

  const formClass = 'w-1/2 p-6 my-5 mx-auto form-style-basic';
  return (
    <form className={formClass} onSubmit={submitHandler}>
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

CreateGarmentForm.propTypes = {
  createHandler: PropTypes.func.isRequired,
};

export default CreateGarmentForm;
