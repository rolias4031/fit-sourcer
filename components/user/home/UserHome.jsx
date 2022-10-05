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
    updatedAt: PropTypes.string,
    lowerBody: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default UserHome;
