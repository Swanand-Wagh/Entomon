'use client';

import React from 'react';

import { Button } from '@/common/components/ui/button';
import { Icon } from '@/common/constants/icons';

interface GoogleButtonProps {
  message: string;
}

export const GoogleButton = ({ message }: GoogleButtonProps) => {
  return (
    <Button variant="outline" className="w-full">
      <Icon name="google" className="mr-3 h-5 w-5" /> {message}
    </Button>
  );
};
