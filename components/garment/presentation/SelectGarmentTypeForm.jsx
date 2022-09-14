import React from 'react';
import PropTypes from 'prop-types'
import { createLabel } from '../../../lib/utilClient'

function SelectGarmentTypeForm({ garmentTypes, raiseState }) {
  // pass down a list of keys to .map() the options
  const selectOptions = Object.keys(garmentTypes).map((key) => {
    const label = createLabel(key)
    return <option key={key} value={key}>{label}</option>
  })

  function changeHandler(event) {
    raiseState(event.target.value)
  }
  return (
    <>
      <label htmlFor="garment-type-dropdown">{}</label>
      <select onChange={changeHandler} name="select-garment-type" id="garment-type-dropdown">
        {selectOptions}
      </select>
    </>
  );
}

SelectGarmentTypeForm.propTypes = {
  garmentTypes: PropTypes.objectOf(PropTypes.string).isRequired,
  raiseState: PropTypes.func.isRequired,
}

export default SelectGarmentTypeForm;
