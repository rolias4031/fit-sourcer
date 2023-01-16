import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditBodyForm from './EditBodyForm';
import { useAlerts } from '../../../lib/hooks';
import Alert from '../../alert/Alert';
import { useEditBody } from '../../../lib/mutations';
import BodyFormLabel from './BodyFormLabel';
import { baseUrl } from '../../../lib/constants';
import StatusSymbols from '../../alert/StatusSymbols';

/*
* container holds logic for updating, editing, etc for EditLowerBodyForm

* get the props it displays from the EditUserContainer
*/

function EditBodyDock({ userMsmntMap }) {
  // component hooks
  const { alerts, resetAlerts, createAlerts } = useAlerts();
  const { mutate, status } = useEditBody();

  // request handler function
  const editBodyHandler = async (formValues, model) => {
    const config = {
      url: `${baseUrl}/api/user/edit/${model}`,
      method: 'PUT',
      inputs: formValues,
    };
    mutate(config, {
      onError: (data) => {
        createAlerts(data.errors);
      },
    });
  };

  const bodyForms = Array.from(userMsmntMap).map(([bodyPart, values]) => (
    <div
      key={`${values.updatedAt}-${values.param}`}
      className="bg-gray-50 border border-gray-200 rounded-sm p-3"
    >
      <BodyFormLabel label={bodyPart} style="text-lg font-bold mb-2" />
      <EditBodyForm
        dbModel={values.param}
        contValues={values.nums}
        onSubmit={editBodyHandler}
      />
    </div>
  ));

  return (
    <>
      {bodyForms}
      <StatusSymbols status={status} />
      <Alert status={status} alerts={alerts} onReset={resetAlerts} isModal />
    </>
  );
}

EditBodyDock.propTypes = {
  userMsmntMap: PropTypes.object.isRequired,
};

export default EditBodyDock;
