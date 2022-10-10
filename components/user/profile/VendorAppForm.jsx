import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { disableButton } from '../../../lib/util-client';
import SubmitButton from '../../form/SubmitButton';
import TextInputState from '../../form/TextInputState';

function VendorAppForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  });
  function submitHandler(event) {
    event.preventDefault()
    onSubmit(formValues)
  }
  return (
    <form onSubmit={submitHandler} className="form-style-basic p-5">
      <TextInputState
        name="name"
        id="name-input-vendor-form"
        label="Company Name"
        placeholder="Get this right... you can't change it!"
        stateValue={formValues.name}
        raiseState={setFormValues}
        inputStyle="text-input text-input-style-basic w-full"
        labelStyle="input-label-basic"
        divStyle="w-full my-2"
      />
      <TextInputState
        name="description"
        id="descr-input-vendor-form"
        placeholder="Describe your company in a sentence or two"
        stateValue={formValues.description}
        raiseState={setFormValues}
        inputStyle="text-input text-input-style-basic w-full"
        labelStyle="input-label-basic"
        divStyle="w-full my-2"
      />
      <SubmitButton
        title="Send App"
        id="submit-vendor-app"
        btnStyle="btn btn-blue mt-4 block ml-auto"
        disabled={disableButton(formValues)}
      />
    </form>
  );
}

VendorAppForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default VendorAppForm;
