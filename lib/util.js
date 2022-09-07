/* eslint-disable import/prefer-default-export */
import { prisma } from './db';

export async function getUserByEmail(email) {
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return exists;
}
