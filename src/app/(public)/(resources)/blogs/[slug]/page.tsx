import React, { Suspense } from 'react';
import { Loading } from '@/common/components/custom';
import { getBlogBySlug } from '@/common/data/admin/blogs';
import { ViewBlog } from '@/modules/resources/components/blogs';

const ViewBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug as string);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ViewBlog data={blog} />
      </Suspense>
    </>
  );
};

export default ViewBlogPage;
