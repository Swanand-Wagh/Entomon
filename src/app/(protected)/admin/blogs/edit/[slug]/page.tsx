import React, { Suspense } from 'react';
import { CreateUpdateBlog } from '@/modules/admin';
import { Loading } from '@/common/components/custom';
import { getBlogBySlug } from '@/common/data/admin/blogs';

const EditBlog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug as string);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <CreateUpdateBlog data={blog} />
      </Suspense>
    </>
  );
};

export default EditBlog;
