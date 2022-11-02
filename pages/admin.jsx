import { getAuth, buildClerkProps } from '@clerk/nextjs/server';
import React from 'react';
import { prisma } from '../lib/db';
import AdminDock from '../components/admin/AdminDock';

function admin() {
  return <AdminDock />;
}

export async function getServerSideProps({ req }) {
  const { userId } = getAuth(req);
  // * check if user has role Admin, redirect if not
  const thisUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (thisUser.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: { ...buildClerkProps(req) } };
}

export default admin;
