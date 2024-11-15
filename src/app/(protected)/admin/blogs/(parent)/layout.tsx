'use client';

import { useParams } from 'next/navigation';
import { CreateUpdateBlog } from '@/modules/admin';

export default function BlogsLayout() {
  const { slug } = useParams();

  return (
    <>
      <CreateUpdateBlog slug={slug as string} />
    </>
  );
}
