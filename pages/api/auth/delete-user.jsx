import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/db';
import { ERRORS, SUCCESS, METHODS } from '../../../lib/constants';
import { getUserByEmail } from '../../../lib/util';

export default async function handler(req, res) {
  // check session
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ message: ERRORS.SIGNED_OUT });
  }
  // check method
  if (req.method !== METHODS.DELETE) {
    console.log('check0');
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }
  // check if user exists
  const { inputs } = req.body;
  const user = await getUserByEmail(inputs.email);
  if (!user) {
    return res.status(404).json({
      message: ERRORS.USER_NOT_FOUND,
    });
  }
  // check if names match for security
  if (
    inputs.firstName !== user.firstName ||
    inputs.lastName !== user.lastName
  ) {
    return res.status(405).json({ message: ERRORS.BAD_CREDS });
  }
  // delete
  await prisma.user.delete({
    where: {
      email: inputs.email,
    },
  });
  return res.status(200).json({ message: SUCCESS.DELETE });
}
