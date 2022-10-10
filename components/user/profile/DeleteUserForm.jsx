import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ST8_KEYS } from '../../../lib/constants';
import TextInputState from '../../form/TextInputState';
import GeneralCheck from '../../form/GeneralCheck';
import SubmitButton from '../../form/SubmitButton';
import { disableButton } from '../../../lib/util-client';

/*
deleting a user requires email, first, and lastname to match. Also typing a confirmation phrase.
*/

function DeleteUserForm({ deleteHandler }) {
  const initialDeleteInputs = {
    [ST8_KEYS.email]: '',
    [ST8_KEYS.firstName]: '',
    [ST8_KEYS.lastName]: '',
    [ST8_KEYS.confirm]: false,
  };
  const [deleteInputs, setDeleteInputs] = useState(initialDeleteInputs);

  function submitHandler(event) {
    // call deleteHandler on submit
    event.preventDefault();
    deleteHandler(deleteInputs);
  }
  return (
    <form
      onSubmit={submitHandler}
      className="p-5 form-style-basic min-w-[500px]"
    >
      <div className="flex space-x-2 my-2">
        <TextInputState
          id="delete-first-name"
          name={ST8_KEYS.firstName}
          inputStyle="w-full text-input-style-basic"
          labelStyle="input-label-basic"
          divStyle="w-1/2"
          raiseState={setDeleteInputs}
          stateValue={deleteInputs.firstName}
        />
        <TextInputState
          id="delete-last-name"
          name={ST8_KEYS.lastName}
          inputStyle="w-full text-input-style-basic"
          labelStyle="input-label-basic"
          divStyle="w-1/2"
          raiseState={setDeleteInputs}
          stateValue={deleteInputs.lastName}
        />
      </div>
      <TextInputState
        id="delete-email"
        name={ST8_KEYS.email}
        inputStyle="text-input-style-basic w-full"
        labelStyle="input-label-basic"
        divStyle="w-full my-2"
        raiseState={setDeleteInputs}
        stateValue={deleteInputs.email}
      />
      <GeneralCheck
        id="delete-confirm"
        name={ST8_KEYS.confirm}
        label="Delete my account forever!"
        raiseState={setDeleteInputs}
      />
      <SubmitButton
        title="Delete"
        id="delete-submit-button"
        btnStyle="btn-red block mt-4 ml-auto"
        disabled={disableButton(deleteInputs)}
      />
    </form>
  );
}

DeleteUserForm.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteUserForm;
