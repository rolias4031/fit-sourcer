import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ST8_KEYS } from '../../../lib/constants';
import TextInputState from '../../form/TextInputState';
import FlexRow from '../../structure/FlexRow';
import GeneralCheck from '../../form/GeneralCheck';
import SubmitButton from '../../form/SubmitButton';
import { enableSubmitBtn } from '../../auth/presentation/SignupForm';

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
      className="p-5 w-1/2 mx-auto bg-gray-100 rounded-md "
    >
      <FlexRow>
        <TextInputState
          id="delete-first-name"
          name={ST8_KEYS.firstName}
          raiseState={setDeleteInputs}
        />
        <TextInputState
          id="delete-last-name"
          name={ST8_KEYS.lastName}
          raiseState={setDeleteInputs}
        />
      </FlexRow>
      <TextInputState
        id="delete-email"
        name={ST8_KEYS.email}
        raiseState={setDeleteInputs}
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
        btnStyle="btn-red mt-4 ml-auto"
        disabled={enableSubmitBtn(deleteInputs)}
      />
    </form>
  );
}

DeleteUserForm.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteUserForm;
