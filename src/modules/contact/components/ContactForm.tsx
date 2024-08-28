'use client';

import { useState, useTransition } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactAction } from '@/actions/contactAction';
import { contactSchema } from '@/common/schemas/contactSchema';

import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { Textarea } from '@/common/components/ui/textarea';
import { FormError } from '@/common/components/custom/FormError';
import { FormSuccess } from '@/common/components/custom/FormSuccess';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/common/components/ui/form';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      contactAction(data).then((response) => {
        form.reset();
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Your phone number"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Your message"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isPending}>
          Send Message
        </Button>
      </form>
    </Form>
  );
}
