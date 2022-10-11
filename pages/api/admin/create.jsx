import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/db';
import { ERRORS } from '../../../lib/constants';
import { getUserByEmail } from '../../../lib/util';

export default async function handler(req, res) {
  // check session
  const { sessionId, userId } = getAuth(req);
  if (!sessionId) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * check if user is already type ADMIN, if so return, if not change role.
  console.log({ inputs: req.body.inputs });
  const user = await getUserByEmail(req.body.inputs.email);
  if (!user) {
    return res.status(404).json({
      message: "That User doesn't exist",
      errors: "That User doesn't exist",
    });
  }
  if (user.role === 'ADMIN') {
    return res.status(400).json({
      message: 'That User is already an Admin',
      errors: 'That User is already an Admin',
    });
  }

  const newAdmin = await prisma.user.update({
    where: {
      email: req.body.inputs.email,
    },
    data: {
      role: {
        set: 'ADMIN',
      },
    },
  });

  console.log({ newAdmin });
  return res.status(201).json({
    message: 'Admin Created',
    display: 'New Admin Created',
  });
}
