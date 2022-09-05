import { titleCase } from 'title-case';

import { prisma } from '../../lib/db';
import { userExists } from '../../lib/util';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { inputs } = req.body;
  console.log(inputs);
  // check if email already in use, function imported from lib/db
  if (userExists(inputs.email)) {
    return res.status(400).json({
      message: 'Email already in use',
    });
  }
  // transform inputs using title-case lib
  inputs.firstName = titleCase(inputs.firstName);
  inputs.lastName = titleCase(inputs.lastName);
  // use prisma to create. note: data property is required for prisma.model.create()
  const newUser = await prisma.user.create({
    data: inputs,
  });
  return res.status(200).json({ message: 'success', newUser });
}
