import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../form/NumberInputState';
import SubmitButton from '../../form/SubmitButton';

function EditBodyForm({ contValues, onSubmit }) {

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
      styles={{
        label: 'label-sm label-base block',
        input: 'input-sm input-base',
        div: 'my-2 px-2 basis-1/6',
      }}
      curState={formValues[key]}
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
        style="btn btn-blue mt-3 mr-2 ml-auto block"
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
