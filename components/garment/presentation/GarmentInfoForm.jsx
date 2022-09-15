import React from 'react';
import TextInputState from '../../form/TextInputState';

/* stores name, vendor, description */

function GarmentInfoForm({ raiseState }) {
  return (
    <div className="mb-5">
      <TextInputState
        raiseState={raiseState}
        id="create-garment-name"
        name="name"
        inputStyle="text-input-style-basic"
        labelStyle="input-label-basic"
      />
      <TextInputState
        raiseState={raiseState}
        id="create-garment-vendor"
        name="vendor"
        inputStyle="text-input-style-basic"
        labelStyle="input-label-basic"
      />
      <TextInputState
        raiseState={raiseState}
        id="create-garment-description"
        name="description"
        inputStyle="text-input-style-basic"
        labelStyle="input-label-basic"
      />
    </div>
  );
}

export default GarmentInfoForm;
