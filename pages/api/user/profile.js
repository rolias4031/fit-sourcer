import { withAuth } from '@clerk/nextjs/api';
import { ERRORS, SUCCESS, METHODS } from '../../../lib/constants';
import { prisma } from '../../../lib/db';

export default withAuth(async (req, res) => {
  // check session
  const { userId, sessionId } = req.auth;
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      lowerBody: true,
    },
  });
  if (!profile) {
    return res.status(404).json({
      message: 'user not created yet',
    });
  }
  return res.status(200).json({ message: 'success', profile });
});
