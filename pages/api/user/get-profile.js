import { withAuth } from '@clerk/nextjs/api';
import { ERRORS, BODY_MODELS_ARR } from '../../../lib/constants';
import { prisma } from '../../../lib/db';

export default withAuth(async (req, res) => {
  // check session
  const { userId, sessionId } = req.auth;
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

  // * incase the user logs in before account gets created at api/webhooks/clerk-atuh
  if (!profile) {
    return res.status(404).json({
      message: 'user not created yet',
    });
  }

  console.log(profile.lowerBody, profile.upperBody);

  // * now we need to check if user has all models -- if not, create them.
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
});
