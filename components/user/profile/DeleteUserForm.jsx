import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ST8_KEYS } from '../../../lib/constants';
import TextInputState from '../../form/TextInputState';
import GeneralCheckbox from '../../form/GeneralCheckbox';
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
      className="p-3 form-base min-w-[500px]"
    >
      <div className="flex space-x-2 mb-2">
        <TextInputState
          id="delete-first-name"
          name={ST8_KEYS.firstName}
          styles={{
            input: 'input input-base w-full',
            div: 'w-full',
            label: 'label label-base',
          }}
          raiseState={setDeleteInputs}
          stateValue={deleteInputs.firstName}
        />
        <TextInputState
          id="delete-last-name"
          name={ST8_KEYS.lastName}
          styles={{
            input: 'input input-base w-full',
            div: 'w-full',
            label: 'label label-base',
          }}
          raiseState={setDeleteInputs}
          stateValue={deleteInputs.lastName}
        />
      </div>
      <TextInputState
        id="delete-email"
        name={ST8_KEYS.email}
        styles={{
          input: 'input input-base w-full',
          div: 'w-full mb-2',
          label: 'label label-base',
        }}
        raiseState={setDeleteInputs}
        stateValue={deleteInputs.email}
      />
      <GeneralCheckbox
        id="delete-confirm"
        name={ST8_KEYS.confirm}
        label="Delete my account forever!"
        styles={{
          div: 'flex items-center space-x-2',
          input: 'w-4 h-4 accent-red-500 rounded',
          label: 'text-gray-800 text-md font-bold',
        }}
        raiseState={setDeleteInputs}
      />
      <SubmitButton
        title="Delete"
        id="delete-submit-button"
        style="btn-red btn-sm block ml-auto mt-2"
        disabled={disableButton(deleteInputs)}
      />
    </form>
  );
}

DeleteUserForm.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteUserForm;
