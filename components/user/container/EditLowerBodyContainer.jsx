import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditLowerBodyForm from '../presentation/EditLowerBodyForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { useEditBody } from '../../../lib/fetch';
import { alertLocIds } from '../../../lib/constants';
import SubHeader from '../../display/SubHeader';
import SuccessSymbol from '../../util/SuccessSymbol';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer

*/
function EditLowerBodyContainer({ lowerBody }) {
  const { id, userId, updatedAt, ...nums } = lowerBody;
  const { alerts } = useContext(AlertContext);
  const { mutate, isLoading, isSuccess, isError } = useEditBody();
  const editBodyHandler = useCallback(async (formValues) => {
    const config = {
      url: 'http://localhost:3000/api/user/edit/lowerBody',
      method: 'PUT',
      inputs: formValues,
      alertLocId: alertLocIds.EDIT_LOWER_BODY_CONTAINER,
    };
    mutate(config);
  });

  return (
    <div className='lg:w-1/2 md:w-3/4 w-5/6 mx-auto mb-10'>
      <div className="flex mx-auto items-center">
        <SubHeader header="Edit Lower Body" headerStyle="flex-1" />
        {isSuccess && <SuccessSymbol />}
      </div>
      <EditLowerBodyForm
        key={updatedAt}
        contValues={nums}
        editBodyHandler={editBodyHandler}
      />
      {alerts.loc === alertLocIds.EDIT_LOWER_BODY_CONTAINER ? (
        <Alert alerts={alerts} />
      ) : null}
    </div>
  );
}

EditLowerBodyContainer.propTypes = {
  lowerBody: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EditLowerBodyContainer;
