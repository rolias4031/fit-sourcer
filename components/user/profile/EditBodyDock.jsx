import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EditBodyForm from './EditBodyForm';
import { useAlerts } from '../../../lib/hooks';
import Alert from '../../alert/Alert';
import { useEditBody } from '../../../lib/mutations';
import SubHeader from '../../display/SubHeader';
import ToggleBodyFormButtons from './ToggleBodyFormButtons';
import StatusSymbols from '../../util/StatusSymbols';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer
*/

function EditBodyDock({ userMsmntMap }) {
  // component hooks
  const { alerts, resetAlerts, createAlerts } = useAlerts();
  const [model, setModel] = useState([...userMsmntMap.keys()][0]);
  const { mutate, status } = useEditBody();

  // request handler function
  const editBodyHandler = async (formValues) => {
    const config = {
      url: `http://localhost:3000/api/user/edit/${
        userMsmntMap.get(model).param
      }`,
      method: 'PUT',
      inputs: formValues,
    };
    mutate(config, {
      onError: (data) => {
        createAlerts(data.errors);
      },
    });
  };

  return (
    <>
      <div className="flex my-1 items-center space-x-3">
        <div className="flex basis-full items-center">
          <SubHeader header="Edit Measurements" style="mr-3" />
          <StatusSymbols status={status} />
        </div>
        <ToggleBodyFormButtons
          curModel={model}
          buttonKeys={[...userMsmntMap.keys()]}
          raiseModel={setModel}
        />
      </div>
      <EditBodyForm
        key={`${userMsmntMap.get(model).updatedAt}-${model}`}
        contValues={userMsmntMap.get(model).nums}
        onSubmit={editBodyHandler}
      />
      <Alert alerts={alerts} onReset={resetAlerts} />
    </>
  );
}

EditBodyDock.propTypes = {
  userMsmntMap: PropTypes.object.isRequired,
};

export default EditBodyDock;
