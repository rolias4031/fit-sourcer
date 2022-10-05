import React from 'react';
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function NavBar() {
  const { userId } = useAuth();
  const auth = userId !== null;
  return (
    <div className="flex items-center py-2 bg-gray-600 text-white">
      <div className="mx-5 flex-auto">
        <Link href="/">FitSourcer.com</Link>
      </div>
      <div className="">
        <Link href="/user/profile">Profile</Link>
      </div>
      <div className="mx-5">
        <Link href="/user/home">Home</Link>
      </div>
      <div className="mr-5">
        {!auth ? (
          <SignInButton redirectUrl="http://localhost:3000/user/home" />
        ) : (
          <UserButton afterSignOutUrl="http://localhost:3000" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
