'use client';

import { Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { subscribeToNewsletter } from '../server/newsletter';
import { FormSuccess } from '@/components/custom';

const newsletterSchema = z.object({
  email: z.string().email(),
  fullName: z.string().optional(),
});

export const NewsLetterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      fullName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    setIsPending(true);
    setSuccessMessage(undefined);
    
    try {
      const result = await subscribeToNewsletter(values);
      setSuccessMessage(result.success);
      form.reset();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <input
            {...form.register('email')}
            type="email"
            id="email"
            placeholder="Enter your email"
            disabled={isPending}
            className={`w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all ${
              form.formState.errors.email ? 'border-red-500' : ''
            }`}
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name (Optional)
        </label>
        <input
          {...form.register('fullName')}
          type="text"
          id="name"
          placeholder="Enter your name"
          disabled={isPending}
          className={`w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all ${
            form.formState.errors.fullName ? 'border-red-500' : ''
          }`}
        />
        {form.formState.errors.fullName && (
          <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
        )}
      </div>

      <FormSuccess message={successMessage} />
      
      <button
        type="submit"
        disabled={isPending}
        className="group w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Subscribing...' : 'Subscribe Now'}
        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};
