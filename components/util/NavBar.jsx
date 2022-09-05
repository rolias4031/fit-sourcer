import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from 'next-auth/react';
import ButtonGeneral from './ButtonGeneral';

const profPath = '/user/profile';
const homePath = '/user/home';

function NavBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const authHandler = session ? signOut : signIn;
  const btnName = session ? 'Sign Out' : 'Sign In';
  const altBtnLink = router.pathname === profPath ? homePath : profPath;
  const altBtnName = router.pathname === profPath ? 'Home' : 'Profile';
  return (
    <div className="flex flex-wrap bg-black-500">
      <div className="bg-red-500 text-white ml-5 flex-auto">
        <Link href="/">Home</Link>
      </div>
      {session ? (
        <div className="bg-green-500 text-white">
          <Link href={altBtnLink}>{altBtnName}</Link>
        </div>
      ) : null}
      <div className="bg-blue-500 text-white mx-5">
        <ButtonGeneral clickHandler={authHandler} title={btnName} />
      </div>
    </div>
  );
}

export default NavBar;
