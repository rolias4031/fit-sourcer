import React from 'react';
import PropTypes from 'prop-types';
import HomeHeader from './HomeHeader';

function UserHome({ profile }) {
  return (
    <HomeHeader firstName={profile.firstName} lastName={profile.lastName} />
  );
}

UserHome.propTypes = {
  profile: PropTypes.exact({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailVerified: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserHome;
