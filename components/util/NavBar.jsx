import React from 'react';
import { SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { USER_ROLES, APP_URLS, baseUrl } from '../../lib/constants';

const navbarRoleMap = new Map([
  [
    USER_ROLES.vendor,
    [
      { href: '/vendor/create', linkName: 'Create' },
      { href: '/vendor/manage', linkName: 'Manage' },
    ],
  ],
  [
    USER_ROLES.user,
    [
      { href: '/user/profile', linkName: 'Profile' },
      { href: '/user/home', linkName: 'Home' },
    ],
  ],
]);

function NavBar({ userRole }) {

  const navContent =
    userRole &&
    navbarRoleMap.get(userRole).map((l) => (
      <Link key={l.href} href={l.href}>
        {l.linkName}
      </Link>
    ));

  return (
    <div className="flex items-center py-2 bg-gray-600 text-white">
      <div className="mx-5 flex-1">
        <Link href="/">FitSourcer.com</Link>
      </div>
      {userRole && <div className="flex space-x-4">{navContent}</div>}
      <div className="mx-5">
        {!userRole ? (
          <SignInButton redirectUrl={APP_URLS.userHome} />
        ) : (
          <UserButton afterSignOutUrl={baseUrl} />
        )}
      </div>
    </div>
  );
}

export default NavBar;
