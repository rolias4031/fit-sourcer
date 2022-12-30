/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { createLabel, genId } from '../../../../lib/util-client';
import GeneralLabel from '../../form/GeneralLabel';

function SelectInput({
  id,
  name,
  label,
  labelStyle,
  selectStyle,
  divStyle,
  optionsArr,
  raiseState,
  stateValue
}) {
  // pass down a list of keys to .map() the options
  const selectOptions = optionsArr.map((val) => {
    const optionLabel = createLabel(val);
    return (
      <option key={`${val}-${genId()}`} value={val}>
        {optionLabel}
      </option>
    );
  });

  function changeHandler(event) {
    console.log(event.target.value)
    raiseState(event.target.value);
  }

  return (
    <div className={divStyle}>
      <GeneralLabel id={id} name={name} label={label} labelStyle={labelStyle} />
      <select
        onChange={changeHandler}
        name={name}
        id={id}
        className={selectStyle}
        value={stateValue}
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
  optionsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  divStyle: PropTypes.string,
  selectStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  raiseState: PropTypes.func.isRequired,
  stateValue: PropTypes.string.isRequired
};

SelectInput.defaultProps = {
  selectStyle: null,
  labelStyle: null,
  divStyle: null,
  label: null,
};

export default SelectInput;
