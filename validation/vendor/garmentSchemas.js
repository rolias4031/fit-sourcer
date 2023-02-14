/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { GARMENT_SEX_TYPES, GARMENT_TYPES } from '../../lib/constants';

const NUM_MAX = 300;
const NUM_MIN = 0;
const GARMENT_TYPES_KEYS = Array.from(GARMENT_TYPES.keys());

export const garmentInfoSchema = z
  .object({
    name: z.string().trim().min(1).max(50),
    description: z.string().trim().min(1).max(100),
    modelNumber: z.string().trim().min(1).max(100),
    sex: z.enum(GARMENT_SEX_TYPES),
    garmentType: z.enum(GARMENT_TYPES_KEYS),
    link: z.string().url()
  })
  .strict();

const garmentMeasDef = z.number().gte(NUM_MIN).lte(NUM_MAX);
export const shortSchema = z.object({
  waist: garmentMeasDef,
  hip: garmentMeasDef,
  seat: garmentMeasDef,
  thigh: garmentMeasDef,
  inseam: garmentMeasDef,
  outseam: garmentMeasDef,
  legOpening: garmentMeasDef,
});
export const pantSchema = shortSchema.extend({
  calf: garmentMeasDef,
});

export const garmentSchemaMap = new Map([
  ['pant', { measModel: 'lowerBodyGarmentMeasurements', schema: pantSchema }],
  ['short', { measModel: 'lowerBodyGarmentMeasurements', schema: shortSchema }],
]);
