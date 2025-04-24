import React, { Suspense } from 'react';
import { getBlogsWithoutContent } from '@/features/blog/server/actions';
import { BlogListLayout } from '@/features/blog/components/BlogListLayout';
import { Loading } from '@/components/custom';

export const revalidate = 3600;

const BlogsContent = async () => {
  const blogs = await getBlogsWithoutContent();
  return <BlogListLayout data={blogs?.data ?? []} />;
};

const BlogsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <Suspense fallback={<Loading />}>
          <BlogsContent />
        </Suspense>
      </div>
    </section>
  );
};

export default BlogsPage;
