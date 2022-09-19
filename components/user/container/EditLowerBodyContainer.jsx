import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditLowerBodyForm from '../presentation/EditLowerBodyForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { useEditBody } from '../../../lib/fetch';
import { alertLocIds } from '../../../lib/constants';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer

*/
function EditLowerBodyContainer({ lowerBody }) {
  const alertCtx = useContext(AlertContext);
  const { mutate, isLoading, isError } = useEditBody();
  const initLowerBodyState = {
    waist: lowerBody.waist,
    hip: lowerBody.hip,
    seat: lowerBody.seat,
    thigh: lowerBody.thigh,
    calf: lowerBody.calf,
    inseam: lowerBody.inseam,
    outseam: lowerBody.outseam,
  };
  const [lowerBodyState, setLowerBodyState] = useState(initLowerBodyState);

  const editBodyHandler = useCallback(async (lowerBodyValues) => {
    const config = {
      url: 'http://localhost:3000/api/user/edit/lowerBody',
      method: 'PUT',
      inputs: lowerBodyValues,
      alertLocId: alertLocIds.EDIT_LOWER_BODY_CONTAINER,
    };
    mutate(config);
  });

  if (isLoading) {
    // make something cool eventually, like a spinning wheel on the form
    return <h1>Loading</h1>;
  }

  return (
    <>
      <EditLowerBodyForm
        contState={lowerBodyState}
        raiseState={setLowerBodyState}
        editBodyHandler={editBodyHandler}
      />
      {alertCtx.alert.loc === alertLocIds.EDIT_LOWER_BODY_CONTAINER ? (
        <Alert alert={alertCtx.alert} />
      ) : null}
    </>
  );
}

const ptsr = PropTypes.string.isRequired;

EditLowerBodyContainer.propTypes = {
  lowerBody: PropTypes.exact({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    waist: ptsr,
    hip: ptsr,
    seat: ptsr,
    thigh: ptsr,
    calf: ptsr,
    inseam: ptsr,
    outseam: ptsr,
  }).isRequired,
};

export default EditLowerBodyContainer;
