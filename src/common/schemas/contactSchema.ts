import { z } from 'zod';
import { allowedDomains } from '@/common/constants/domains';

const emailDomainRegex = new RegExp(`@(${allowedDomains.map((domain) => domain.replace('.', '\\.')).join('|')})$`);
const phoneRegex = /^\+?[1-9]\d{0,2}[-.\s]?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).max(50, { message: 'Name must not exceed 50 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }).regex(emailDomainRegex, {
    message: 'Email domain is not allowed. Please use a valid domain.',
  }),
  phone: z
    .string()
    .regex(phoneRegex, {
      message: 'Phone number must be in a valid format (e.g., +1(425)-364-8497 or +442071838750).',
    })
    .optional(),
  message: z
    .string()
    .min(1, { message: 'Message is required.' })
    .max(500, { message: 'Message must not exceed 500 characters.' }),
});

export { contactSchema };
