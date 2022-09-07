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
