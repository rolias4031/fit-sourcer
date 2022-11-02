import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/db';
import { ERRORS } from '../../../lib/constants';

export default async function handler(req, res) {
  // check session
  const { sessionId } = getAuth(req);
  if (!sessionId) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * get list of all vendor apps where vendorProfile.status ===  PENDING
  const usersWithVendorApps = await prisma.user.findMany({
    where: {
      vendorProfile: {
        is: {
          status: 'PENDING'
        }
      }
    }, 
    include: {
      vendorProfile: true
    }
  })
  console.log({ usersWithVendorApps })
  return res.status(200).json({
    message: 'fetch success',
    usersWithVendorApps,
  })
}
