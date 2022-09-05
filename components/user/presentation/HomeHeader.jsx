import React from 'react';
import PropTypes from 'prop-types';

function HomeHeader({ firstName, lastName }) {
  return (
    <h1 className="text-left my-5 text-3xl font-bold">{`Welcome back, ${firstName} ${lastName}!`}</h1>
  );
}

HomeHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default HomeHeader;
