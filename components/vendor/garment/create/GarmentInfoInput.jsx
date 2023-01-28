import React from 'react';
import PropTypes from 'prop-types';
import TextInputState from '../../../form/TextInputState';

/* stores name, vendor, description */

function GarmentInfoInput({ stateValues, raiseState, divStyle }) {
  const inputStyle = 'input-sm input-base w-full';
  const labelStyle = 'label-sm label-base block';
  const inputDivStyle = 'my-1 px-1';
  return (
    <div className={divStyle}>
      <TextInputState
        raiseState={raiseState}
        curState={stateValues.name}
        id="create-garment-name"
        name="name"
        label="Garment Name"
        styles={{
          input: inputStyle,
          label: labelStyle,
          div: inputDivStyle,
        }}
        placeholder="Name of the garment"
      />
      <TextInputState
        raiseState={raiseState}
        curState={stateValues.description}
        id="create-garment-description"
        name="description"
        styles={{
          input: inputStyle,
          label: labelStyle,
          div: inputDivStyle,
        }}
        placeholder="A brief description of the garment"
      />
      <TextInputState
        raiseState={raiseState}
        curState={stateValues.modelNumber}
        id="create-garment-modelNumber"
        name="modelNumber"
        styles={{
          input: inputStyle,
          label: labelStyle,
          div: inputDivStyle,
        }}
        placeholder="Model, SKU, or Serial Number"
      />
    </div>
  );
}

GarmentInfoInput.propTypes = {
  stateValues: PropTypes.objectOf(PropTypes.string).isRequired,
  raiseState: PropTypes.func.isRequired,
  divStyle: PropTypes.string,
};

GarmentInfoInput.defaultProps = {
  divStyle: null
};

export default GarmentInfoInput;
