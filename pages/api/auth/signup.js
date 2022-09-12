import { titleCase } from 'title-case';
import { prisma } from '../../../lib/db';
import { getUserByEmail } from '../../../lib/util';
import { METHODS, ERRORS, SUCCESS } from '../../../lib/constants';
import { createUserSchema } from '../../../validation/schemas';

export default async function handler(req, res) {
  if (req.method !== METHODS.POST) {
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }
  const { inputs } = req.body;
  const val = createUserSchema.safeParse(inputs);
  if (!val.success) {
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED} - ${val.error.issues[0].message}`,
    });
  }
  // check if email already in use, function imported from lib/db
  if (await getUserByEmail(inputs.email)) {
    return res.status(400).json({
      message: ERRORS.EMAIL_TAKEN,
    });
  }
  // transform inputs using title-case lib and string methods
  inputs.firstName = titleCase(inputs.firstName);
  inputs.lastName = titleCase(inputs.lastName);
  inputs.email = inputs.email.toLowerCase()
  // use prisma to create. note: data property is required for prisma.model.create()
  const newUser = await prisma.user.create({
    data: {
      email: inputs.email,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      lowerBody: {
        create: {}
      }
    }
  });
  return res.status(200).json({ message: SUCCESS.NEW_USER, newUser });
}
