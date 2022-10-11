import { getAuth } from '@clerk/nextjs/server';
import { ERRORS } from '../../../lib/constants';
import { vendorAppSchema } from '../../../validation/schemas';
import { prisma } from '../../../lib/db';
import { extractValidationErrors } from '../../../lib/util';

/*
* DOES:
- creates a vendor profile for User with userId and name + description

*/

export default async function handler(req, res) {
  // check session
  const { sessionId, userId } = getAuth(req);
  if (!sessionId) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * validate inputs
  const { inputs } = req.body;
  console.log('vendor/create inputs', inputs);
  const appVal = vendorAppSchema.safeParse(inputs);
  if (!appVal.success) {
    const errors = extractValidationErrors(appVal.error.issues);
    return res.status(400).json({
      message: ERRORS.VALIDATION_FAILED,
      errors,
    });
  }

  // * check if vendor profile already exists for this user
  const thisUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      vendorProfile: true,
    },
  });

  console.log({ thisUser });
  if (thisUser.vendorProfile) {
    return res.status(400).json({
      message: "You're already a vendor!",
      errors: "You're already a vendor!",
    });
  }

  // * create vendor profile and connect to the user, change role type.
  await prisma.vendorProfile.create({
    data: {
      description: inputs.description,
      name: inputs.name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  // * update user role to vendor -- exists for easy check
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: {
        set: 'VENDOR',
      },
    },
    include: {
      vendorProfile: true,
    },
  });

  console.log({ updatedUser });

  return res.status(201).json({
    message: 'Vendor profile created',
    display: "Thanks for your application! Expect to hear from us in 1-2 days.",
    updatedUser,
  });
}
