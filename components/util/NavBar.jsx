import React from 'react';
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function NavBar() {
  const { userId } = useAuth();
  return (
    <div className="flex items-center py-2 bg-gray-600 text-white">
      <div className="mx-5 flex-auto">
        <Link href="/">FitSourcer.com</Link>
      </div>
      <div className="">
        {userId ? <Link href="/user/profile">Profile</Link> : null}
      </div>
      <div className="mx-5">
        {userId ? <Link href="/user/home">Home</Link> : null}
      </div>
      <div className="mr-5">
        {!userId ? (
          <SignInButton redirectUrl="http://localhost:3000/user/home" />
        ) : (
          <UserButton afterSignOutUrl="http://localhost:3000" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
