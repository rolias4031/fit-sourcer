import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, USER_ROLES } from '../../../lib/constants';
import { getUserRole } from '../../../lib/util';
import { prisma } from '../../../lib/db';

export default async function handler(req, res) {
  // check session & user is vendor
  const { userId, sessionId } = getAuth(req);
  const thisUser = await getUserRole(userId);
  if (!sessionId || thisUser.role !== USER_ROLES.vendor) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  const { garmentId } = req.query

  const garment = await prisma.garment.findUnique({
    where: {
      id: garmentId
    },
    include: {
      lowerBodyGarmentMeasurements: true,
      images: true
    }
  })

  if (!garment) {
    return res.status(404).json({
      message: 'Garment with that Id not found.',
      errors: 'Garment not found'
    })
  }

  return res.status(200).json({
    message: 'success',
    garment
  })
}