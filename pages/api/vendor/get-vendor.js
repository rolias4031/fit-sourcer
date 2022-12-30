import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, USER_ROLES } from '../../../lib/constants';
import { prisma } from '../../../lib/db';
import { getUserRole } from '../../../lib/util';

export default async function handler(req, res) {
  // check auth
  const { userId, sessionId } = getAuth(req);
  const thisUser = await getUserRole(userId);
  if (!sessionId || thisUser.role !== USER_ROLES.vendor) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // user -> vendorProfile -> lowerBodyGarments + images + measurements
  const vendor = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      vendorProfile: {
        include: {
          garments: true
        },
      },
    },
  });

  console.log(vendor)

  return res.status(200).json({
    message: 'Garments Fetched',
    vendor,
  });
}
