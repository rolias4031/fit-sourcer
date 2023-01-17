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
    event.preventDefault();
    onSubmit(formValues);
  }
  return (
    <form onSubmit={submitHandler} className="form-base p-3">
      <TextInputState
        name="name"
        id="name-input-vendor-form"
        label="Company Name"
        placeholder="Get this right... you can't change it!"
        stateValue={formValues.name}
        raiseState={setFormValues}
        styles={{
          input: 'input input-base w-full',
          div: 'w-full mb-2',
          label: 'label label-base',
        }}
      />
      <TextInputState
        name="description"
        id="descr-input-vendor-form"
        placeholder="Describe your company in a sentence or two"
        stateValue={formValues.description}
        raiseState={setFormValues}
        styles={{
          input: 'input input-base w-full',
          div: 'w-full mb-2',
          label: 'label label-base',
        }}
      />
      <SubmitButton
        title="Send App"
        id="submit-vendor-app"
        style="btn-sm btn-blue block ml-auto"
        disabled={disableButton(formValues)}
      />
    </form>
  );
}

VendorAppForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default VendorAppForm;
