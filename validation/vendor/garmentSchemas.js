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
    garmentType: z.enum(GARMENT_TYPES_KEYS)
  })
  .strict();

const garmentNumDef = z.number().gte(NUM_MIN).lte(NUM_MAX);
export const shortSchema = z.object({
  waist: garmentNumDef,
  hip: garmentNumDef,
  seat: garmentNumDef,
  thigh: garmentNumDef,
  inseam: garmentNumDef,
  outseam: garmentNumDef,
  legOpening: garmentNumDef,
});
export const pantSchema = shortSchema.extend({
  calf: garmentNumDef,
});

export const garmentSchemaMap = new Map([
  ['pant', { measModel: 'lowerBodyGarmentMeasurements', schema: pantSchema }],
  ['short', { measModel: 'lowerBodyGarmentMeasurements', schema: shortSchema }],
]);
