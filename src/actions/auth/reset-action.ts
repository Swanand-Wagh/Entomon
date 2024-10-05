'use server';

import * as z from 'zod';

import { getUserByEmail } from '@/common/data/auth';
import { resetSchema } from '@/common/schemas/authSchema';
import { sendPasswordResetEmail } from '@/common/lib/mail';
import { generatePasswordResetToken } from '@/common/lib/tokens';

export const resetAction = async (values: z.infer<typeof resetSchema>) => {
  const validateFields = resetSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid email!' };

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: 'Email not found!' };

  // TODO: Generate token & send email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Reset email sent!' };
};
