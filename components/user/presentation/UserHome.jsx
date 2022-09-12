import React from 'react';
import PropTypes from 'prop-types';
import HomeHeader from './HomeHeader';

function UserHome({ profile }) {
  return (
    <HomeHeader firstName={profile.firstName} lastName={profile.lastName} />
  );
}

const ptsr = PropTypes.string.isRequired
UserHome.propTypes = {
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
    }),
  }).isRequired,
};

export default UserHome;
