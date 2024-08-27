'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/common/schemas/authSchema';
import { loginAction } from '@/actions/loginAction';
import { zodResolver } from '@hookform/resolvers/zod';

import { GoogleButton } from './GoogleButton';
import { FormError } from '@/common/components/custom/FormError';
import { FormSuccess } from '@/common/components/custom/FormSuccess';

import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/ui/form';

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      loginAction(data).then((response) => {
        form.reset();
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
                <Link href="/forgot-password" className="m-0 ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
                  className={fieldState.invalid ? 'border-red-500' : ''}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          Login
        </Button>
      </form>

      <GoogleButton message="Login with Google" />
    </Form>
  );
}
