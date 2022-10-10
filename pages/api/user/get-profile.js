import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, BODY_MODELS_ARR } from '../../../lib/constants';
import { prisma } from '../../../lib/db';

export default async function handler(req, res) {
  // check session
  const { userId, sessionId } = getAuth(req);
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // * get user information by Id
  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      lowerBody: true,
      upperBody: true,
    },
  });

  // * incase the user logs in before account gets created at api/webhooks/clerk-auth
  if (!profile) {
    return res.status(404).json({
      message: 'user not created yet',
      errors: 'User does not exist'
    });
  }

  console.log(profile.lowerBody, profile.upperBody);

  // * now we need to check if user has all models -- if not, create them. this exists to update existing profiles when a new model is created.
  BODY_MODELS_ARR.forEach(async (model) => {
    if (profile[model]) return;
    console.log('api/user/profile', `${model} missing - creating new.`);
    const newModel = await prisma[model].create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    // replace null model with newModel
    profile[model] = newModel;
  });

  return res.status(200).json({ message: 'success', profile });
}
