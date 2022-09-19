import { Webhook } from 'svix';
import { buffer } from 'micro';
import { prisma } from '../../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.SVIX_SECRET;

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString();
  const { headers } = req;

  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: 'verification failed',
    });
  }

  console.log(msg);
  if (msg.type === 'user.created') {
    // msg.data.id
    const newUser = await prisma.user.create({
      data: {
        id: msg.data.id,
        lowerBody: {
          create: {}
        },
      },
    });

    console.log(newUser);
    res.status(201).json({
      message: 'running webhook',
      newUser,
    });
  } else if (msg.type === 'user.deleted') {
    // make sure userExists
    const deletedUser = await prisma.user.delete({
      where: {
        id: msg.data.id
      }
    })
    console.log(deletedUser);
    res.status(201).json({
      message: 'User Deleted',
      deletedUser,
    })
  }
}
