import React from 'react';
import NumberInputState from '../../form/NumberInputState';
import SubmitButton from '../../form/SubmitButton'

function EditMeasurementsForm() {
  const formClass = 'mx-auto p-5 rounded-md w-1/2 bg-gray-100';
  const containerClass = 'flex flex-row flex-wrap gap-4 justify-between';
  return (
    <form className={formClass}>
      <div className={containerClass}>
        <NumberInputState id="waist" label="Waist" />
        <NumberInputState id="hips" label="Hips" />
        <NumberInputState id="seat" label="Seat" />
        <NumberInputState id="thigh" label="Thigh" />
        <NumberInputState id="calf" label="Calf" />
        <NumberInputState id="inseam" label="Inseam" />
        <NumberInputState id="outseam" label="Outseam" />
      </div>
      <SubmitButton title="Save" id="save-changes-btn" btnStyle="btn-blue mt-4 ml-auto"/>
    </form>
  );
}

export default EditMeasurementsForm;
