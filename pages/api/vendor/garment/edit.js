import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, USER_ROLES } from '../../../../lib/constants';
import {
  convertStringObjectToNums,
  extractValidationErrors,
  getUserRole,
} from '../../../../lib/util';
import { prisma } from '../../../../lib/db';
import {
  garmentInfoSchema,
  garmentSchemaMap,
} from '../../../../validation/vendor/garmentSchemas';
import { imagesSchema } from '../../../../validation/schemas';

export default async function handler(req, res) {
  // check session & user is vendor
  const { userId, sessionId } = getAuth(req);
  const thisUser = await getUserRole(userId);
  if (!sessionId || thisUser.role !== USER_ROLES.vendor) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  const { garmentId, infoValues, measValues, imageValues } = req.body;

  const infoValid = garmentInfoSchema.safeParse(infoValues);
  if (!infoValid.success) {
    const errors = extractValidationErrors(infoValid.errors.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  const { measModel, schema } = garmentSchemaMap.get(infoValues.garmentType);
  // convert numValues to integers
  const convertedNums = convertStringObjectToNums(measValues);
  const measValid = schema.safeParse(convertedNums);
  if (!measValid.success) {
    const errors = extractValidationErrors(measValid.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  const newImages = imageValues.filter((i) => !i.id);

  const imagesValid = imagesSchema.safeParse(newImages);
  if (!imagesValid.success) {
    const errors = extractValidationErrors(imagesValid.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  await prisma.garment.update({
    where: {
      id: garmentId,
    },
    data: {
      ...infoValues,
      [measModel]: {
        update: {
          ...measValues
        }
      },
      images: {
        create: newImages
      },
    },
  });

  return res.status(200).json({
    message: 'success',
  });

  // validate all inputs

  // check if garment exists

  // update garment values

  // return garment
}
