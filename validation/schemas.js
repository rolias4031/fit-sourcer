/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { BODY_MODELS_OBJ } from '../lib/constants';

export const imageUrlSchema = z.string().url().array()

export const createUserSchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
});

export const deleteUserSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  confirm: z.boolean(),
});

const NUM_MAX = 300;
const NUM_MIN = 0;

const bodyModelNumDef = z.number().gte(NUM_MIN).lte(NUM_MAX);
export const lowerBodySchema = z
  .object({
    waist: bodyModelNumDef,
    hip: bodyModelNumDef,
    seat: bodyModelNumDef,
    thigh: bodyModelNumDef,
    calf: bodyModelNumDef,
    inseam: bodyModelNumDef,
    outseam: bodyModelNumDef,
  })
  .strict();

export const upperBodySchema = z
  .object({
    neck: bodyModelNumDef,
    shoulder: bodyModelNumDef,
    chest: bodyModelNumDef,
    stomach: bodyModelNumDef,
    bicep: bodyModelNumDef,
    forearm: bodyModelNumDef,
    arm: bodyModelNumDef,
    torso: bodyModelNumDef,
  })
  .strict();

export const bodyModelSchemaMap = new Map([
  [BODY_MODELS_OBJ.lowerBody, lowerBodySchema],
  [BODY_MODELS_OBJ.upperBody, upperBodySchema],
]);

export const modelSchema = z.enum(Object.keys(BODY_MODELS_OBJ));

const GARMENT_TYPES = ['pant', 'short'];
const infoNameMax = 50;
const infoNameMin = 1;
const infoDescMax = 100;
export const garmentInfoSchema = z
  .object({
    name: z.string().trim().min(infoNameMin).max(infoNameMax),
    vendor: z.string().trim().min(infoNameMin).max(infoNameMax),
    description: z.string().trim().min(infoNameMin).max(infoDescMax),
    type: z.enum(GARMENT_TYPES), // allow only specific strings from GARMENT_TYPES
  })
  .strict();

const vendorNameMax = 100;
const vendorDescMax = 200;
export const vendorAppSchema = z.object({
  name: z.string().trim().min(1).max(vendorNameMax),
  description: z.string().trim().min(1).max(vendorDescMax),
});
