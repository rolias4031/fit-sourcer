import React from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../../form/NumberInputState'

function GarmentNumsInput({ stateValues, raiseState, contStyle }) {
  const formInputElements = Object.keys(stateValues).map((key) => (
    <NumberInputState
      key={key}
      id={`create-garment-${key}`}
      name={key}
      labelStyle="label-sm label-base block"
      inputStyle="input-sm input-base w-full"
      divStyle="basis-1/6 px-1 my-1"
      stateValue={stateValues[key]}
      raiseState={raiseState}
    />
  ));
  return <div className={contStyle}>{formInputElements}</div>;
}

GarmentNumsInput.propTypes = {
  raiseState: PropTypes.func.isRequired,
  stateValues: PropTypes.objectOf(PropTypes.string).isRequired,
  contStyle: PropTypes.string,
}

GarmentNumsInput.defaultProps = {
  contStyle: null
}
export default GarmentNumsInput;
