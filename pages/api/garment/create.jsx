import { withAuth } from '@clerk/nextjs/api';
import { ERRORS, METHODS } from '../../../lib/constants';
import { prisma } from '../../../lib/db';
import { convertStringObjectToNums, extractValidationErrors } from '../../../lib/util';
import {
  garmentInfoSchema,
  lowerBodyNumsSchema,
} from '../../../validation/schemas';

/*
 * eventually want to connect this to vendor credentials. Find some way to giver different users vendor roles, which allows them to create garments here. That garment will also be linked to their vendor account, and vendors can see all their garments and edit them.
 */

const modelMap = new Map([
  ['pant', { model: 'lowerBodyGarment', schema: lowerBodyNumsSchema }],
  ['short', { model: 'lowerBodyGarment', schema: lowerBodyNumsSchema }]
])

export default withAuth(async (req, res) => {
  // check session
  const { userId, sessionId } = req.auth;
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  // check method
  if (req.method !== METHODS.POST) {
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }

  // need to create a map that looks up schemas by model type

  // validate inputs: type, info strings, measurments,
  // convert to nums
  const { garmentInfo, garmentNums } = req.body.inputs;
  console.log(garmentInfo, garmentNums);
  const infoValid = garmentInfoSchema.safeParse(garmentInfo);
  if (!infoValid.success) {
    const errors = extractValidationErrors(infoValid.error.issues)
    // should return array of messages
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    })
  }
  const convertedNums = convertStringObjectToNums(garmentNums);
  const { schema } = modelMap.get(garmentInfo.type)
  const numsValid = schema.safeParse(convertedNums)
  if (!numsValid.success) {
    const errors = extractValidationErrors(infoValid.error.issues)
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    })
  }

  const { model } = modelMap.get(garmentInfo.type)
  console.log(model)

  const newGarment = await prisma[model].create({
    data: {
      ...garmentInfo,
      ...garmentNums
    },
  });
  console.log(newGarment);
  return res.status(200).json({
    message: 'Garment created',
    newGarment,
  });
});
