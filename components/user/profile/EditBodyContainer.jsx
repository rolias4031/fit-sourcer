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

const MyComp = ({ func }) => {
  useEffect(() => {
    console.log('HII');
  }, [func])
  return <p>hi</p>
}

function EditBodyContainer({ map }) {
  // component hooks
  const { alerts, resetAlerts, createAlerts } = useAlerts();
  const [model, setModel] = useState([...map.keys()][0]);
  const { mutate, isLoading, isSuccess, isError } = useEditBody();

  // request handler function
  const editBodyHandler = async (formValues) => {
    const config = {
      url: `http://localhost:3000/api/user/edit/${map.get(model).param}`,
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
      <div className="flex my-1 mx-auto items-center space-x-3">
        <div className="flex flex-1 items-center">
          <SubHeader header="Edit Body" headerStyle="mr-3" />
          <StatusSymbols
            loading={isLoading}
            success={isSuccess}
            error={isError}
          />
        </div>
        <ToggleBodyFormButtons
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
      <Alert alerts={alerts} onReset={resetAlerts} />
      <MyComp func={editBodyHandler} />
    </>
  );
}

EditBodyContainer.propTypes = {
  map: PropTypes.object.isRequired,
};

export default EditBodyContainer;
