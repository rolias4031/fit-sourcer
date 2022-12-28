import { Webhook } from 'svix';
import { buffer } from 'micro';
import { prisma } from '../../../lib/db';

/*  
* this route handles all clerk webhooks. Right now just created and deleted.
*/

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.SVIX_SECRET;

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString();
  const { headers } = req;

  console.log({payload, headers})

  const wh = new Webhook(secret);
  let msg;
  try {
    msg = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: 'verification failed',
    });
  }

  // * creating a new user after clerk sign up
  console.log(msg);
  if (msg.type === 'user.created') {
    // msg.data.id
    const newUser = await prisma.user.create({
      data: {
        id: msg.data.id,
        email: msg.data.email_addresses[0].email_address,
        lowerBody: {
          create: {}
        },
        upperBody: {
          create: {}
        }
      },
    });

    console.log(newUser);
    res.status(201).json({
      message: 'running webhook',
      newUser,
    });

  // * deleting a user after clerk deletion
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
