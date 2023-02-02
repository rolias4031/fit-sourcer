import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, USER_ROLES } from '../../../../lib/constants';
import { getUserRole } from '../../../../lib/util';
import { prisma } from '../../../../lib/db';

export default async function handler(req, res) {
  // check session & user is vendor
  const { userId, sessionId } = getAuth(req);
  const thisUser = await getUserRole(userId);
  if (!sessionId || thisUser.role !== USER_ROLES.vendor) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  console.log(req.body);

  // validate all inputs

  // check if garment exists

  // update garment values

  // return garment

}