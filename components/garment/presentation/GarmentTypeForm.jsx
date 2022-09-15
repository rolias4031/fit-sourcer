/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../../lib/util-client';

function GarmentTypeForm({ id, garmentTypes, raiseState }) {
  // pass down a list of keys to .map() the options
  const selectOptions = Object.keys(garmentTypes).map((key) => {
    const label = createLabel(key);
    return (
      <option key={key} value={key}>
        {label}
      </option>
    );
  });

  function changeHandler(event) {
    raiseState(event.target.value);
  }

  const labelClass = `block text-gray-700 text-sm my-1`;
  const selectClass = `block mb-5 p-1 form-select w-1/2 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out text-base font-normal`;
  return (
    <>
      <label className={labelClass} htmlFor={id}>
        Select Garment Type
      </label>
      <select
        onChange={changeHandler}
        name="select-garment-type"
        id={id}
        className={selectClass}
      >
        {selectOptions}
      </select>
    </>
  );
}

GarmentTypeForm.propTypes = {
  id: PropTypes.string.isRequired,
  garmentTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  raiseState: PropTypes.func.isRequired,
};

export default GarmentTypeForm;
