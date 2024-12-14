import { z } from 'zod';
import { allowedDomains } from '@/common/constants/domains';

const emailDomainRegex = new RegExp(`@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`);

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }).regex(emailDomainRegex, {
    message: 'Email domain is not allowed. Please use a valid domain.',
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
    .max(20, { message: 'First name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name can only contain alphabets.',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' })
    .max(20, { message: 'Last name must not exceed 20 characters.' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name can only contain alphabets.',
    }),
  email: z.string().email({ message: 'Invalid email address.' }).regex(emailDomainRegex, {
    message: 'Email domain is not allowed. Please use a valid domain.',
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
  email: z.string().email({ message: 'Invalid email address.' }).regex(emailDomainRegex, {
    message: 'Email domain is not allowed. Please use a valid domain.',
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
