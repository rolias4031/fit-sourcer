import React from 'react';
import { useAuth } from '@clerk/nextjs';

import PropTypes from 'prop-types';
import NavBar from './NavBar';
import { useGetUserRole } from '../../lib/queries';

function Layout({ children }) {
  const { userId } = useAuth();
  const { data, isLoading, isError } = useGetUserRole(userId);
  return (
    <>
      <NavBar userRole={data?.userRole}/>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Layout;
