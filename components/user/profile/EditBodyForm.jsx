import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberInputState from '../../form/NumberInputState';
import SubmitButton from '../../form/SubmitButton';

function EditBodyForm({ dbModel, contValues, onSubmit }) {

  const [formValues, setFormValues] = useState(contValues);

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(formValues, dbModel);
  }

  const numberInputElements = Object.keys(contValues).map((key) => (
    <NumberInputState
      key={key}
      id={`edit-body-${key}`}
      name={key}
      styles={{
        label: 'label label-base block',
        input: 'input-sm input-base',
        div: 'flex my-1 items-center justify-between space-x-3',
      }}
      curState={formValues[key]}
      raiseState={setFormValues}
    />
  ));

  return (
    <form onSubmit={submitHandler} className="">
      <div className="flex flex-col">{numberInputElements}</div>
      <SubmitButton
        title="Save"
        name="save"
        id="save-changes-btn"
        style="btn-sm btn-blue mt-3 float-right"
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
