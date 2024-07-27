'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';

export const LoginForm = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button variant="outline" className="w-full">
        Login with Google
      </Button>
    </div>
  );
};
