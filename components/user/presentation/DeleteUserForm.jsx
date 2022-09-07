import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    email: '',
    firstName: '',
    lastName: '',
    confirm: false,
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
          title="First Name"
          id="firstName"
          raiseState={setDeleteInputs}
        />
        <TextInputState
          title="Last Name"
          id="lastName"
          raiseState={setDeleteInputs}
        />
      </FlexRow>
      <TextInputState title="Email" id="email" raiseState={setDeleteInputs} />
      <GeneralCheck
        id="confirm"
        title="Delete my account forever!"
        raiseState={setDeleteInputs}
      />
      <SubmitButton
        title="Delete"
        id="delete-profile-btn"
        btnStyle="btn-red"
        disabled={enableSubmitBtn(deleteInputs)}
      />
    </form>
  );
}

DeleteUserForm.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteUserForm;
