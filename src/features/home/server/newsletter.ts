'use server';

import { actionClient } from '@/lib/action-clients';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email(),
  fullName: z.string().optional(),
});

export async function subscribeToNewsletter(data: z.infer<typeof newsletterSchema>) {
  // Simulate a delay for the API call
  await new Promise(resolve => setTimeout(resolve, 100));

  console.log('Newsletter subscription data:', data);

    return {
    success: 'We\'ll shortly add you to the newsletter.',
  };
}