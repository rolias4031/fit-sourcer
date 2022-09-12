/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

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

export const editBodySectionSchema = z.object({
  waist: z.number().lte(500),
  hip: z.number().lte(500),
  seat: z.number().lte(500),
  thigh: z.number().lte(500),
  calf: z.number().lte(500),
  inseam: z.number().lte(500),
  outseam: z.number().lte(500),
})
