import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Link href="/signup">Signup</Link>
    </>
  );
}
