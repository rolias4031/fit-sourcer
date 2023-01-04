/* eslint-disable arrow-body-style */
import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicPaths = [
  '/',
  '/vendor/signin',
  '/vendor/signup',
  '/api/vendor/vendor-check',
  '/api/webhooks/clerk-auth',
];
const isPublic = (path) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};
export default withClerkMiddleware((req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const { sessionId } = getAuth(req);
  if (!sessionId) {
    const redirectUrl = 'http://localhost:3000/';
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
});

export const config = { matcher: '/((?!.*\\.).*)' };
