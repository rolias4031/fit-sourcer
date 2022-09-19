import React from 'react';
import PropTypes from 'prop-types';
import HomeHeader from './HomeHeader';

function UserHome({ profile, info }) {
  console.log(profile);
  return <HomeHeader firstName={info.firstName} lastName={info.lastName} />;
}

UserHome.propTypes = {
  profile: PropTypes.exact({
    id: PropTypes.string,
    lowerBody: PropTypes.exact({
      waist: PropTypes.string,
      hip: PropTypes.string,
      seat: PropTypes.string,
      thigh: PropTypes.string,
      calf: PropTypes.string,
      inseam: PropTypes.string,
      outseam: PropTypes.string,
      userId: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
  info: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    primaryEmail: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

export default UserHome;
