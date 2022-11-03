import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/db';
import { ERRORS } from '../../../lib/constants';
import { getUserById } from '../../../lib/util';

export default async function handler(req, res) {
  // * check session
  const { sessionId, userId } = getAuth(req);
  if (!sessionId) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * check if user is type admin

  const thisUser = await getUserById(userId);
  if (thisUser.role !== 'ADMIN') {
    return res.status(400).json({
      message: 'NOT AN ADMIN',
      errors: 'NOT AN ADMIN',
    });
  }

  console.log({ inputs: req.body.inputs });
  console.log(userId);

  // * check type of action - then either change status or delete the application
  const { action } = req.body.inputs;
  const { appId } = req.body.inputs;
  if (action === 'approve') {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: {
          set: 'VENDOR',
        },
        vendorProfile: {
          update: {
            status: {
              set: 'APPROVED',
            },
          },
        },
      },
    });
    console.log(updatedUser);
  } else if (action === 'deny') {
    await prisma.vendorProfile.delete({
      where: {
        id: appId,
      },
    });
  }

  return res.status(200).json({
    message: 'success',
  });
}
