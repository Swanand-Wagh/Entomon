import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Invalid email format.',
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
  code: z.optional(
    z.string().regex(/^[A-Za-z0-9]+$/, {
      message: 'Code must only contain alphanumeric characters.',
    })
  ),
});

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name can only contain alphabets.',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name can only contain alphabets.',
    }),
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Invalid email format.',
    }),
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters required.' })
    .max(20, { message: 'Maximum 20 characters allowed.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
});

const resetSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email is required.' })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Invalid email format.',
    }),
});

const newPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters required.' })
    .max(20, { message: 'Maximum 20 characters allowed.' })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-`~,.<>?/;:'"\[\]{}|]+$/, {
      message: 'Password contains invalid characters.',
    }),
});

export { loginSchema, registerSchema, resetSchema, newPasswordSchema };
