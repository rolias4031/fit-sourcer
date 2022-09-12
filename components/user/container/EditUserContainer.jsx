import React from 'react';
import PropTypes from 'prop-types';
import EditLowerBodyContainer from './EditLowerBodyContainer';

/*
* container holds all containers for editing a user's profile. Edit(LowerBody, UpperBody, etc)Container.
* main job is organizational: it takes profile and distributes it to the various containers.
* get the props it displays from the UserProfileContainer
*/

function EditUserContainer({ profile }) {
  return (
    <EditLowerBodyContainer
      lowerBody={profile.lowerBody}
    />
  );
}

const ptsr = PropTypes.string.isRequired;

EditUserContainer.propTypes = {
  profile: PropTypes.shape({
    email: ptsr,
    firstName: ptsr,
    lastName: ptsr,
    emailVerified: ptsr,
    id: ptsr,
    lowerBody: PropTypes.shape({
      waist: ptsr,
      hip: ptsr,
      seat: ptsr,
      thigh: ptsr,
      calf: ptsr,
      inseam: ptsr,
      outseam: ptsr,
    }).isRequired,
  }).isRequired,
};

export default EditUserContainer;
