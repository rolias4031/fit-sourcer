/* eslint-disable no-use-before-define */
import React, { useCallback, useState } from 'react';
import GeneralButton from '../../../form/GeneralButton';
import CreateGarmentForm from './CreateGarmentForm';
import { genId } from '../../../../lib/util-client';

function CreateGarmentDock() {
  const createForm = (formId) => (
    <CreateGarmentForm
      key={formId}
      id={formId}
      formClass="form-base xl:w-1/2 lg:w-3/4 w-5/6 mx-auto mb-5 p-3 flex flex-col hover-parent"
      onRemove={() => modFormsHandler(formId, 'subtract')}
    />
  );

  const [garmentForms, setGarmentForms] = useState([createForm('1')]);

  const modFormsHandler = useCallback((formId, op) => {
    setGarmentForms((prev) => {
      let newForms;
      if (op === 'add' && prev.length < 10) {
        newForms = [...prev, createForm(genId())];
      } else if (op === 'subtract' && prev.length > 1) {
        const deleteThis = prev.find(
          (form) => form.props.id.toString() === formId,
        );
        newForms = [...prev];
        newForms.splice(prev.indexOf(deleteThis), 1);
      } else {
        newForms = prev;
      }
      return newForms;
    });
  });

  return (
    <>
      <div className="xl:w-1/2 lg:w-3/4 w-5/6 mx-auto m-5 flex">
        <GeneralButton
          name="Save All Garments"
          styles={{ button: 'btn-sm btn-blue block' }}
        />
      </div>
      {garmentForms}
      <div className="xl:w-1/2 lg:w-3/4 w-5/6 mx-auto mb-28">
        <GeneralButton
          name="+ Form"
          styles={{ button: 'btn-sm btn-gray block ml-auto' }}
          onClick={(_) => modFormsHandler(_, 'add')}
        />
      </div>
    </>
  );
}

export default CreateGarmentDock;
