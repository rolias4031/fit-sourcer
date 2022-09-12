import React, { useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditLowerBodyForm from '../presentation/EditLowerBodyForm';
import Alert from '../../alert/Alert'
import { AlertContext } from '../../../context/AlertContext';
import { requestWithAlert } from '../../../lib/fetch';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer

*/
const alertLocId = 'ALERT_LOWER_BODY_CONTAINER'

function EditLowerBodyContainer({ lowerBody }) {
  const alertCtx = useContext(AlertContext);
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
    // parseInt for all values before sending
    const config = {
      fetchUrl: 'http://localhost:3000/api/user/edit/lowerBody',
      method: 'PUT',
      inputs: lowerBodyValues,
      redirectUrl: null,
      timeoutTime: null,
      alertLoc: alertLocId
    };
    requestWithAlert(config, alertCtx);
  })

  return (
    <>
    <EditLowerBodyForm
      contState={lowerBodyState}
      raiseState={setLowerBodyState}
      editBodyHandler={editBodyHandler}
    />
    {alertCtx.alert.loc === alertLocId ? <Alert alert={alertCtx.alert}/> : null}
    </>
  );
}

const ptsr = PropTypes.string.isRequired;

EditLowerBodyContainer.propTypes = {
  lowerBody: PropTypes.shape({
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
