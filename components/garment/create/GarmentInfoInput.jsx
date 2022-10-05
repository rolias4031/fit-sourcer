import React from 'react';
import PropTypes from 'prop-types';
import TextInputState from '../../form/TextInputState';

/* stores name, vendor, description */

function GarmentInfoInput({ stateValues, raiseState }) {
  const inputContent = Object.keys(stateValues).map((key) => (
    <TextInputState
      raiseState={raiseState}
      stateValue={stateValues[key]}
      key={key}
      id={`create-garment-${key}`}
      name={key}
      label={key === 'name' ? 'Garment Name' : null}
      inputStyle="text-input-style-basic w-full"
      labelStyle="input-label-basic"
      divStyle="my-1"
    />
  ));
  return (
    <div className="">
      {inputContent}
    </div>
  );
}

GarmentInfoInput.propTypes = {
  stateValues: PropTypes.objectOf(PropTypes.string).isRequired,
  raiseState: PropTypes.func.isRequired,
};

export default GarmentInfoInput;
