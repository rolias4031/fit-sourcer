import { getAuth, buildClerkProps } from '@clerk/nextjs/server';
import React from 'react';
import AdminDock from '../components/admin/AdminDock';

function admin() {
  return <AdminDock />;
}

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  // * check if user has role Admin
  return { props: { ...buildClerkProps(req) } };
}

export default admin;
