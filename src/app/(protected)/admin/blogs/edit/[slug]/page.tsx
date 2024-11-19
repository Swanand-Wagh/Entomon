import React from 'react';
import { CreateUpdateBlog } from '@/modules/admin';
import { getBlogBySlug } from '@/common/data/admin/blogs';

const EditBlog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug as string);

  return (
    <>
      <CreateUpdateBlog data={blog} />
    </>
  );
};

export default EditBlog;
