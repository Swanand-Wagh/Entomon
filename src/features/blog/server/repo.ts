import 'server-only';

import { prisma } from '@/db/prisma';
import { Blog, BlogComment, Prisma } from '@prisma/client';

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
  });
}

async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return slugs.map((slug) => slug.slug);
}

async function getBlogWithoutContentById(blogId: string) {
  return await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
      author: true,
      userId: true,
    },
  });
}

export type BlogsWithoutContent = Pick<
  Blog,
  'userId' | 'title' | 'slug' | 'categories' | 'isPaid' | 'author' | 'createdAt' | 'updatedAt' | 'coverImage'
>;
async function getBlogsWithoutContent(): Promise<BlogsWithoutContent[]> {
  return await prisma.blog.findMany({
    select: {
      userId: true,
      title: true,
      slug: true,
      coverImage: true,
      categories: true,
      isPaid: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getBlogsByUserWithoutContent(userId: string): Promise<BlogsWithoutContent[]> {
  return await prisma.blog.findMany({
    where: {
      userId,
    },
    select: {
      userId: true,
      title: true,
      slug: true,
      coverImage: true,
      categories: true,
      isPaid: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
  return await prisma.blog.create({
    data,
  });
}

async function updateBlog(blogId: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
  return await prisma.blog.update({
    where: { id: blogId },
    data: data,
  });
}

async function deleteBlog(blogId: string): Promise<Blog> {
  return await prisma.blog.delete({
    where: { id: blogId },
  });
}

// -------------------------- Comments --------------------------

async function getBlogCommentById(blogCommentId: string): Promise<BlogComment | null> {
  return await prisma.blogComment.findUnique({
    where: {
      id: blogCommentId,
    },
  });
}

export type CommentsWithAuthor = { id: string; content: string; createdAt: Date; author: string; userId: string };
async function getAllBlogComments(blogId: string): Promise<CommentsWithAuthor[]> {
  const comments = await prisma.blogComment.findMany({
    where: {
      blogId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    author: comment.author.name,
    userId: comment.userId,
  }));
}

async function createBlogComment(data: { content: string; blogId: string; userId: string }): Promise<BlogComment> {
  return await prisma.blogComment.create({
    data: {
      content: data.content,
      blogId: data.blogId,
      userId: data.userId,
    },
  });
}

async function deleteBlogComment(blogCommentId: string): Promise<BlogComment> {
  return await prisma.blogComment.delete({
    where: { id: blogCommentId },
  });
}

export const blogRepo = {
  getBlogBySlug,
  getAllBlogSlugs,
  getBlogsWithoutContent,
  getBlogWithoutContentById,
  getBlogsByUserWithoutContent,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCommentById,
  getAllBlogComments,
  createBlogComment,
  deleteBlogComment,
};
