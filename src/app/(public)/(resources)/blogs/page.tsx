import React from 'react';
import { getAllBlogs } from '@/common/data/admin/blogs';

export const BlogsPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogsPage;
