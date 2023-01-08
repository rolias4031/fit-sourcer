import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../form/NumberInputState';
import SubmitButton from '../../form/SubmitButton';

/* 
! this component can probably be abstracted to EditBodyForm, and passed a different set of keys to map through.
*/



function EditBodyForm({ contValues, onSubmit }) {
  // very important lesson here: props cannot update state by just being passed through the initialState. Use a key (on the parent component) with a unique, changing value, which forces an entire remount, which will re-init this state with current prop values.
  const [formValues, setFormValues] = useState(contValues);

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(formValues);
  }

  const numberInputElements = Object.keys(contValues).map((key) => (
    <NumberInputState
      key={key}
      id={`edit-body-${key}`}
      name={key}
      labelStyle="input-label-basic block"
      inputStyle="number-input-style-basic w-full"
      divStyle="my-2 px-2 basis-1/4"
      stateValue={formValues[key]}
      raiseState={setFormValues}
    />
  ));

  const formClass = 'p-5 form-style-basic min-w-[500px]';
  const containerClass = 'flex flex-row flex-wrap';
  return (
    <form onSubmit={submitHandler} className={formClass}>
      <div className={containerClass}>{numberInputElements}</div>
      <SubmitButton
        title="Save"
        id="save-changes-btn"
        btnStyle="btn-blue mt-3 mr-2 ml-auto block"
        disabled={false}
      />
    </form>
  );
}

EditBodyForm.propTypes = {
  contValues: PropTypes.objectOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditBodyForm;
