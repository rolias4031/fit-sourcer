import React from 'react';
import Link from 'next/link';
import Header from '../components/display/Header';

export default function Home() {
  return (
    <>
      <Header size={1} title="Home" />
      <Link href="/signup">Signup</Link>
    </>
  );
}
