import React from 'react';
import EditMeasurementsForm from '../presentation/EditMeasurementsForm';


/*
* container holds all the logic for editing a user's profile - options, measurements, etc. Separate forms for each function.

* get the props it displays from the ProfileContainer

*/

function EditUserContainer() {
  return (
    <EditMeasurementsForm />
  );
}

export default EditUserContainer;

