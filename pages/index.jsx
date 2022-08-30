import React from 'react';
import Link from 'next/link';
import Header from '../components/display/Header';
import NavBar from '../components/structure/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto items-center">
        <Header size={1} title="Home" />
        <Link href="/signup">Signup</Link>
      </div>
    </>
  );
}
