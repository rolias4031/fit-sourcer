/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { BODY_MODELS_OBJ } from '../lib/constants';

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

const NUM_MAX = 300
const NUM_MIN = 0

export const lowerBodySchema = z.object({
  waist: z.number().gte(NUM_MIN).lte(NUM_MAX),
  hip: z.number().gte(NUM_MIN).lte(NUM_MAX),
  seat: z.number().gte(NUM_MIN).lte(NUM_MAX),
  thigh: z.number().gte(NUM_MIN).lte(NUM_MAX),
  calf: z.number().gte(NUM_MIN).lte(NUM_MAX),
  inseam: z.number().gte(NUM_MIN).lte(NUM_MAX),
  outseam: z.number().gte(NUM_MIN).lte(NUM_MAX),
}).strict()

export const upperBodySchema = z.object({
  neck: z.number().gte(NUM_MIN).lte(NUM_MAX),
  shoulder: z.number().gte(NUM_MIN).lte(NUM_MAX),
  chest: z.number().gte(NUM_MIN).lte(NUM_MAX),
  stomach: z.number().gte(NUM_MIN).lte(NUM_MAX),
  bicep: z.number().gte(NUM_MIN).lte(NUM_MAX),
  forearm: z.number().gte(NUM_MIN).lte(NUM_MAX),
  arm: z.number().gte(NUM_MIN).lte(NUM_MAX),
  torso: z.number().gte(NUM_MIN).lte(NUM_MAX),
}).strict()

export const bodyModelSchemaMap = new Map([
  [BODY_MODELS_OBJ.lowerBody, lowerBodySchema],
  [BODY_MODELS_OBJ.upperBody, upperBodySchema]
])

export const modelSchema = z.enum(Object.keys(BODY_MODELS_OBJ))

const GARMENT_TYPES = ['pant', 'short']
const infoNameMax = 50
const infoNameMin = 1
const infoDescMax = 100
export const garmentInfoSchema = z.object({
  name: z.string().trim().min(infoNameMin).max(infoNameMax),
  vendor: z.string().trim().min(infoNameMin).max(infoNameMax),
  description: z.string().trim().min(infoNameMin).max(infoDescMax),
  type: z.enum(GARMENT_TYPES) // allow only specific strings from GARMENT_TYPES
}).strict()