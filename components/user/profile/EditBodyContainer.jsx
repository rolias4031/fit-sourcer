import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import EditBodyForm from './EditBodyForm';
import Alert from '../../alert/Alert';
import { AlertContext } from '../../../context/AlertContext';
import { useEditBody } from '../../../lib/mutations';
import { alertLocIds } from '../../../lib/constants';
import SubHeader from '../../display/SubHeader';
import ToggleBodyForm from './ToggleBodyForm';
import SuccessSymbol from '../../util/SuccessSymbol';
import LoadingSymbol from '../../util/LoadingSymbol';
import StatusSymbols from '../../util/StatusSymbols';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer
*/

function EditBodyContainer({ map }) {
  // component hooks
  const [model, setModel] = useState([...map.keys()][0]);
  const { alerts } = useContext(AlertContext);
  const { mutate, isLoading, isSuccess, isError } = useEditBody();

  // request handler function
  const editBodyHandler = useCallback(async (formValues) => {
    const config = {
      url: `http://localhost:3000/api/user/edit/${map.get(model).param}`,
      method: 'PUT',
      inputs: formValues,
      alertLocId: alertLocIds.EDIT_BODY_CONTAINER,
    };
    mutate(config);
  });

  return (
    <>
      <div className="flex my-1 mx-auto items-center space-x-3">
        <div className="flex flex-1 items-center">
          <SubHeader header="Edit Body" headerStyle="mr-3" />
          <StatusSymbols
            loading={isLoading}
            success={isSuccess}
            error={isError}
          />
        </div>
        <ToggleBodyForm
          currentSection={model}
          buttonKeys={[...map.keys()]}
          raiseState={setModel}
        />
      </div>
      <EditBodyForm
        key={`${map.get(model).updatedAt}-${model}`}
        contValues={map.get(model).nums}
        editBodyHandler={editBodyHandler}
      />
      {alerts.loc === alertLocIds.EDIT_BODY_CONTAINER ? (
        <Alert alerts={alerts} />
      ) : null}
    </>
  );
}

EditBodyContainer.propTypes = {
  map: PropTypes.object.isRequired,
};

export default EditBodyContainer;
