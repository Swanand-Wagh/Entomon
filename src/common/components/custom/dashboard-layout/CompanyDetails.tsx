'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { BugIcon } from '@/common/components/custom';
import { SidebarGroup, useSidebar } from '@/common/components/ui/sidebar';

export const CompanyDetails = () => {
  const { state } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup
      onClick={() => router.push('/')}
      className={`flex flex-row gap-2 cursor-pointer ${state === 'collapsed' ? 'px-0' : 'px-2'} py-3`}
    >
      <BugIcon className={`w-fit ${state === 'collapsed' ? 'mx-auto' : ''}`} />
      {state !== 'collapsed' && <span className="text-lg font-bold">Entomon Institute</span>}
    </SidebarGroup>
  );
};
