import { getAuth } from '@clerk/nextjs/server';
import { ERRORS } from '../../../lib/constants';
import { prisma } from '../../../lib/db';

export default async function handler(req, res) {
  // check session
  const { userId, sessionId } = getAuth(req);
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * get user information by Id
  const thisUser = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  return res.status(200).json({ message: 'success', userRole: thisUser.role });
}
