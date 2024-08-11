'use client';

import React from 'react';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/common/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { GoogleButton } from './GoogleButton';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { FormError } from '@/common/components/custom/FormError';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/ui/form';
import { FormSuccess } from '@/common/components/custom/FormSuccess';

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
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

        <FormError />
        <FormSuccess />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <GoogleButton message="Login with Google" />
    </Form>
  );
}
