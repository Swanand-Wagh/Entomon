import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

const registerSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name is required.',
  }),
  lastName: z.string().min(1, {
    message: 'Last name is required.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export { loginSchema, registerSchema };
