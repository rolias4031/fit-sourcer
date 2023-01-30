import React from 'react';
import PropTypes from 'prop-types';
import TextInputState from '../../../form/TextInputState';

/* stores name, vendor, description */

function GarmentInfoInput({ infoState, raiseInfo, styles }) {
  const inputStyle = 'input-sm input-base w-full';
  const labelStyle = 'label-sm label-base block';
  const inputDivStyle = 'my-1 px-1';
  return (
    <div className={styles.div}>
      <TextInputState
        raiseState={raiseInfo}
        curState={infoState.name}
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
        raiseState={raiseInfo}
        curState={infoState.description}
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
        raiseState={raiseInfo}
        curState={infoState.modelNumber}
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
  infoState: PropTypes.objectOf(PropTypes.string).isRequired,
  raiseInfo: PropTypes.func.isRequired,
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
};

GarmentInfoInput.defaultProps = {
  styles: {
    div: '',
  },
};

export default GarmentInfoInput;
