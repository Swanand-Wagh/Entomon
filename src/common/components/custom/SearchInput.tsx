'use client';

import { Input } from '@/common/components/ui/input';
import { Icon } from '@/common/constants/icons';

export const SearchInput = () => (
  <div className="relative w-full">
    <Icon name="search" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input type="search" placeholder="Search..." className="pl-8 w-full" />
  </div>
);
