import React from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../form/NumberInputState';
import SubmitButton from '../../form/SubmitButton';

const lowerBodySectionKeys = [
  'waist',
  'hip',
  'seat',
  'thigh',
  'calf',
  'inseam',
  'outseam',
]

function EditLowerBodyForm({ contState, raiseState, editBodyHandler }) {

  function submitHandler(event) {
    event.preventDefault()
    editBodyHandler(contState)
  }

  const numberInputElements = lowerBodySectionKeys.map((key) => (
    <NumberInputState
      key={key}
      id={`edit-body-${key}`}
      name={key}
      labelStyle="input-label-basic block"
      inputStyle="number-input-style-basic w-20"
      divStyle="my-2"
      stateValue={contState[key]}
      raiseState={raiseState}
    />
  ));

  const formClass = 'mx-auto p-5 rounded-md w-1/2 bg-gray-100';
  const containerClass = 'flex flex-row flex-wrap gap-4 justify-around';
  return (
    <form onSubmit={submitHandler} className={formClass}>
      <div className={containerClass}>{numberInputElements}</div>
      <SubmitButton
        title="Save"
        id="save-changes-btn"
        btnStyle="btn-blue mt-4 ml-auto"
        disabled={false}
      />
    </form>
  );
}

const ptsr = PropTypes.string.isRequired;
EditLowerBodyForm.propTypes = {
  contState: PropTypes.shape({
    waist: ptsr,
    hip: ptsr,
    seat: ptsr,
    thigh: ptsr,
    calf: ptsr,
    inseam: ptsr,
    outseam: ptsr,
  }).isRequired,
  raiseState: PropTypes.func.isRequired,
  editBodyHandler: PropTypes.func.isRequired,
};

export default EditLowerBodyForm;
