import { withAuth } from '@clerk/nextjs/api';
import { prisma } from '../../../../lib/db';
import { ERRORS, METHODS } from '../../../../lib/constants';
import {
  convertStringObjectToNums,
  extractValidationErrors,
} from '../../../../lib/util';
import {
  bodyModelSchemaMap,
  modelSchema,
} from '../../../../validation/schemas';

/*
 * dynamic route to edit a user's body model. Accepts either lowerBody or upperBody.
 * uses these terms in the query param to get the correct schema.
 */
export default withAuth(async (req, res) => {
  // * route validation
  const { userId, sessionId } = req.auth;
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  if (req.method !== METHODS.PUT) {
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }

  // * run validation for bodyModel param, can only be in accepted models
  const { bodyModel } = req.query;
  const modelVal = modelSchema.safeParse(bodyModel);
  if (!modelVal.success) {
    const errors = extractValidationErrors(modelVal.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  // * convert inputs to decimals, run validation on schema for that body model.
  const convertedInputs = convertStringObjectToNums(req.body.inputs);
  const numsVal = bodyModelSchemaMap.get(bodyModel).safeParse(convertedInputs);
  if (!numsVal.success) {
    const errors = extractValidationErrors(numsVal.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  // * make edits and return error if update is empty or failed
  const update = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      [bodyModel]: {
        update: convertedInputs,
      },
    },
  });
  if (!update) {
    return res.status(404).json({ message: ERRORS.NOT_FOUND });
  }

  // * return update object
  return res.status(201).json({
    message: 'Update success',
    update,
  });
});
