/* eslint-disable import/prefer-default-export */
import { Prisma } from '@prisma/client';
import { ERRORS } from './constants';
import { prisma } from './db';

export async function getUserRole(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      role: true,
      vendorProfile: true,
    },
  });
  return user;
}

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function getUserBodySection(email, bodySection) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      [bodySection]: true,
    },
  });

  return user[bodySection];
}

export async function editUserBodySection(id, bodySection, bodySectionValues) {
  const update = await prisma.user.update({
    where: {
      id,
    },
    data: {
      [bodySection]: {
        update: bodySectionValues,
      },
    },
  });
  return update;
}

export function convertStringObjectToNums(stringValues) {
  const nums = {};
  const keys = Object.keys(stringValues);
  keys.forEach((key) => {
    nums[key] = parseFloat(stringValues[key]);
  });
  return nums;
}

export function extractValidationErrors(zodErrors) {
  const ValidationErrors = zodErrors.map((error) => {
    const path = error.path[0];
    const { message } = error;
    return `${path} input - ${message}`;
  });
  return ValidationErrors;
}

export function parsePrismaError(err) {
  if (
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientValidationError
  ) {
    return err.message;
  }
  return ERRORS.UKNOWN_PRISMA;
}
