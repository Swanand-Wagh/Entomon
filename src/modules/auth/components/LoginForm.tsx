'use client';

import React from 'react';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Icon } from '@/common/constants/icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/components/ui/form';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

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
                <Input placeholder="m@example.com" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
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
                <Input type="password" {...field} className={fieldState.invalid ? 'border-red-500' : ''} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          <Icon name="google" className="mr-3 h-5 w-5" /> Login with Google
        </Button>
      </form>
    </Form>
  );
}
