import React from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../form/NumberInputState';

function GarmentNumsInput({ typeKeys, stateValues, raiseState }) {
  const formInputElements = typeKeys.map((key) => (
    <NumberInputState
      key={key}
      id={`create-garment-${key}`}
      name={key}
      labelStyle="input-label-basic block"
      inputStyle="number-input-style-basic w-full"
      divStyle="my-2 px-2 basis-1/2"
      stateValue={stateValues[key]}
      raiseState={raiseState}
    />
  ));
  const containerClass = 'flex flex-row flex-wrap justify-start';
  return <div className={containerClass}>{formInputElements}</div>;
}

GarmentNumsInput.propTypes = {
  typeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  raiseState: PropTypes.func.isRequired,
  stateValues: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default GarmentNumsInput;
