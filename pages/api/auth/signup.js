import * as bcrypt from 'bcrypt';

import { prisma } from '../../../lib/db';
import { userExists } from '../../../lib/util';

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
  // hash password before storing
  const hashedPw = bcrypt.hash(inputs.password, 10);
  inputs.password = hashedPw;
  // use prisma to create. note: data property is required for prisma.model.create()
  const newUser = await prisma.user.create({
    data: inputs,
  });
  return res.status(200).json({ message: 'success', newUser });
}
