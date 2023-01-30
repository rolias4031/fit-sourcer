import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '../../../../lib/db';
import { ERRORS, USER_ROLES } from '../../../../lib/constants';
import { getUserRole } from '../../../../lib/util';

export default async function handler(req, res) {
  const { userId, sessionId } = getAuth(req)
  const thisUser = await getUserRole(userId);
  if (!sessionId || thisUser.role !== USER_ROLES.vendor) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  const deletedGarment = await prisma.garment.delete({
    where: {
      id: req.body.garmentId
    }
  })
  console.log(deletedGarment);

  return res.status(200).json({
    message: 'Garment Deleted'
  })
}
