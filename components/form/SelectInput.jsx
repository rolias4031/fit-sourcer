/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { createLabel, genId } from '../../lib/util-client';
import GeneralLabel from './GeneralLabel';

function SelectInput({
  id,
  name,
  label,
  styles,
  optionsArr,
  raiseState,
  curState,
  disabled,
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
    console.log(event.target.value);
    raiseState((prevState) => ({ ...prevState, [name]: event.target.value }));
  }

  return (
    <div className={styles.div}>
      <GeneralLabel
        id={id}
        name={name}
        label={label}
        style={styles.label}
      />
      <select
        onChange={changeHandler}
        name={name}
        id={id}
        className={styles.select}
        value={curState}
        disabled={disabled}
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
  styles: PropTypes.exact({
    div: PropTypes.string,
    label: PropTypes.string,
    select: PropTypes.string,
  }),
  raiseState: PropTypes.func.isRequired,
  curState: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SelectInput.defaultProps = {
  styles: { div: null, label: null, select: null },
  label: null,
  disabled: false
};

export default SelectInput;
