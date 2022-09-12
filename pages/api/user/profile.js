import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/db';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });
  const { email } = session.user;
  const profile = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      lowerBody: true,
    }
  });
  return res.status(200).json({ message: 'success', profile });
}
