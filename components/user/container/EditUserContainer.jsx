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

EditUserContainer.propTypes = {
  profile: PropTypes.exact({
    id: PropTypes.string.isRequired,
    lowerBody: PropTypes.exact({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      waist: PropTypes.string.isRequired,
      hip: PropTypes.string.isRequired,
      seat: PropTypes.string.isRequired,
      thigh: PropTypes.string.isRequired,
      calf: PropTypes.string.isRequired,
      inseam: PropTypes.string.isRequired,
      outseam: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditUserContainer;
