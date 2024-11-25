import React, { Suspense } from 'react';
import { prisma } from '@/common/lib/prisma';
import { getBlogBySlug } from '@/common/data/admin/blogs';
import { ViewBlog } from '@/modules/resources/components/blogs';
import { Footer, Loading, Navbar } from '@/common/components/custom';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

const ViewBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug as string);

  return (
    <>
      <Navbar />
      {/* <Suspense fallback={<Loading />}> */}
      <ViewBlog data={blog} />
      {/* </Suspense> */}
      <Footer />
    </>
  );
};

export default ViewBlogPage;
