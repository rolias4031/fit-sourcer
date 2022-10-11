import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { disableButton } from '../../lib/util-client';
import SubmitButton from '../form/SubmitButton';
import TextInputState from '../form/TextInputState';

function CreateAdminForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    email: '',
  });

  async function submitHandler(event) {
    event.preventDefault();
    onSubmit(formValues);
  }
  return (
    <form onSubmit={submitHandler} className="form-style-basic p-5">
      <TextInputState
        name="email"
        id="email-input-admin-create"
        placeholder="Email of the person you want to make an Admin"
        stateValue={formValues.email}
        raiseState={setFormValues}
        inputStyle="text-input text-input-style-basic w-full"
        labelStyle="input-label-basic"
        divStyle="w-full my-2"
      />
      <SubmitButton
        title="Create Admin"
        id="create-admin-button"
        btnStyle="btn btn-blue mt-4 ml-auto"
        disabled={disableButton(formValues)}
      />
    </form>
  );
}

CreateAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateAdminForm;
