import React from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../../form/NumberInputState'

function GarmentNumsInput({ measState, raiseMeas, styles, disabled }) {
  const formInputElements = Object.keys(measState).map((key) => (
    <NumberInputState
      key={key}
      id={`create-garment-${key}`}
      name={key}
      styles={{
        label: styles.label,
        input: styles.input,
        div: styles.div,
      }}
      curState={measState[key]}
      raiseState={raiseMeas}
      disabled={disabled}
    />
  ));
  return <div className={styles.container}>{formInputElements}</div>;
}

GarmentNumsInput.propTypes = {
  raiseMeas: PropTypes.func.isRequired,
  measState: PropTypes.objectOf(PropTypes.string).isRequired,
  styles: PropTypes.exact({
    label: PropTypes.string,
    input: PropTypes.string,
    div: PropTypes.string,
    container: PropTypes.string,
  }),
  disabled: PropTypes.bool,
}

GarmentNumsInput.defaultProps = {
  styles: {
    label: '',
    input: '',
    div: '',
    container: '',
  },
  disabled: false
}
export default GarmentNumsInput;
