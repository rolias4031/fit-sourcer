import React from 'react';
import Link from 'next/link';

function NavBar() {
  return (
    <div className="flex flex-wrap bg-black-500">
      <div className="bg-red-500 text-white flex-auto">
        <Link href="/">Home</Link>
      </div>
      <div className="bg-blue-500 text-white mx-5">
        <Link href="/signup">Signup</Link>
      </div>
      <div className="bg-green-500 text-white mr-5">
        <Link href="/">Another</Link>
      </div>
    </div>
  );
}

export default NavBar;
