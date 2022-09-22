/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../../lib/util-client';
import GeneralLabel from '../../form/GeneralLabel';

function SelectInput({
  id,
  name,
  label,
  labelStyle,
  selectStyle,
  divStyle,
  optionKeys,
  raiseState,
}) {
  // pass down a list of keys to .map() the options
  const selectOptions = Object.keys(optionKeys).map((key) => {
    const optionLabel = createLabel(key);
    return (
      <option key={`${key}-createType`} value={key}>
        {optionLabel}
      </option>
    );
  });

  function changeHandler(event) {
    raiseState(event.target.value);
  }

  return (
    <div className={divStyle}>
      <GeneralLabel id={id} name={name} label={label} labelStyle={labelStyle}/>
      <select
        onChange={changeHandler}
        name={name}
        id={id}
        className={selectStyle}
      >
        {selectOptions}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  optionKeys: PropTypes.objectOf(PropTypes.string).isRequired,
  divStyle: PropTypes.string,
  selectStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  raiseState: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  selectStyle: null,
  labelStyle: null,
  divStyle: null,
  label: null,
};

export default SelectInput;
