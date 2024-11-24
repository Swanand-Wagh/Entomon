import React from 'react';
import { getAllBlogs } from '@/common/data/admin/blogs';
import { BlogList } from '@/modules/resources/components/blogs/BlogList';

const BlogsPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <>
      <h1>Blogs</h1>
      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogsPage;
