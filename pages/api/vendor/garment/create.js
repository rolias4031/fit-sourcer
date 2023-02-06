import { getAuth } from '@clerk/nextjs/server';
import { ERRORS, METHODS, USER_ROLES } from '../../../../lib/constants';
import { prisma } from '../../../../lib/db';
import {
  convertStringObjectToNums,
  extractValidationErrors,
  getUserRole,
} from '../../../../lib/util';
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
  // check method
  if (req.method !== METHODS.POST) {
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }
  // validate infoValues
  const { infoValues, measValues, imageValues } = req.body;
  console.log(req.body);
  const infoValid = garmentInfoSchema.safeParse(infoValues);
  console.log({ infoValid });
  if (!infoValid.success) {
    const errors = extractValidationErrors(infoValid.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }
  // get right schema and model according to garmentType
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

  // validate imageUrls
  const imagesValid = imagesSchema.safeParse(imageValues);
  if (!imagesValid.success) {
    const errors = extractValidationErrors(imagesValid.error.issues);
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED}`,
      errors,
    });
  }

  // check if garment with that name exists
  const garmentExists = await prisma.garment.findUnique({
    where: {
      name: infoValues.name,
    },
  });
  if (garmentExists) {
    return res.status(400).json({
      errors: ERRORS.GARMENT_ALREADY_EXISTS,
    });
  }

  const images = imageValues.map((val) => ({ url: val.url, key: val.key }));

  // create new garment
  const newGarment = await prisma.garment.create({
    data: {
      ...infoValues,
      vendor: {
        connect: { id: thisUser.vendorProfile.id },
      },
      [measModel]: {
        create: {
          ...measValues,
        },
      },
      images: {
        create: images,
      },
    },
  });
  return res.status(200).json({
    message: 'Garment created',
    newGarment,
  });
}
