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

export async function getUserBodySection(email, bodySection) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      [bodySection]: true,
    }
  });

  return user[bodySection]
}

export async function editUserBodySection(id, bodySection, bodySectionValues) {
  const update = await prisma.user.update({
    where: {
      id,
    },
    data: {
      [bodySection]: {
        update: bodySectionValues
      }
    }
  });
  return update
}

export function convertBodySectionValuesToNums(bodySectionValues) {
  const nums = {}
  const keys = Object.keys(bodySectionValues)
  keys.forEach((key) => {
    nums[key] = parseFloat(bodySectionValues[key])
  })
  return nums
}
