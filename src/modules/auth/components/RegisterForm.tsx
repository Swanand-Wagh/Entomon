'use client';

import React, { useState, useTransition } from 'react';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/common/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerAction } from '@/actions/registerAction';

import { GoogleButton } from './GoogleButton';
import { FormError } from '@/common/components/custom/FormError';
import { FormSuccess } from '@/common/components/custom/FormSuccess';

import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/ui/form';

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      registerAction(data).then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Max" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Robinson" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  placeholder="m@example.com"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Create an account
        </Button>
      </form>

      <GoogleButton message="Signup with Google" />
    </Form>
  );
}
