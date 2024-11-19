'use client';

import { useRef, useState, useTransition } from 'react';

import Link from '@tiptap/extension-link';
import { useEditor } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

import { z } from 'zod';
import { BlogForm } from './BlogForm';
import { Blog } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/common/schemas/blogSchema';
import { createBlogAction } from '@/actions/admin/create-blog-action';

type CreateUpdateBlogProps = {
  data: Blog | null;
};

export const CreateUpdateBlog = ({ data }: CreateUpdateBlogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: data
      ? {
          title: data.title || '',
          slug: data.slug || '',
          coverImage: data.coverImage || '',
          categories: data.categories || [],
          isPaid: data.isPaid || false,
          content: data.content || '',
        }
      : {
          title: '',
          slug: '',
          coverImage: '',
          categories: [],
          isPaid: false,
          content: '',
        },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Link,
      Color,
      Underline,
      TextStyle,
      Highlight,
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'w-[80%] max-w-full mx-auto rounded-sm',
        },
      }),
      CharacterCount,
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Placeholder.configure({ placeholder: 'Write something …' }),
    ],
    content: data ? data.content : '',
    onUpdate: ({ editor }) => {
      form.setValue('content', editor.getHTML());
    },
  });

  const handleResetBlog = () => {
    form.clearErrors();

    if (data) {
      form.reset({
        title: data.title || '',
        slug: data.slug || '',
        coverImage: data.coverImage || '',
        categories: data.categories || [],
        isPaid: data.isPaid || false,
        content: data.content || '',
      });
      editor?.commands.setContent(data.content || '');
      setCoverImagePreview(data.coverImage || null);
    } else {
      form.reset();
      editor?.commands.clearContent();
      setCoverImagePreview(null);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('coverImage', URL.createObjectURL(file));
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (values: z.infer<typeof blogSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      startTransition(() => {
        createBlogAction(values)
          .then((data) => {
            if (data?.error) {
              handleResetBlog();
              setError(data.error);
            }
            if (data?.success) {
              handleResetBlog();
              setSuccess(data.success);
            }
          })
          .catch(() => setError('Something went wrong!'));
      });
    });
  };

  return (
    <BlogForm
      form={form}
      error={error}
      editor={editor}
      success={success}
      onSubmit={onSubmit}
      isPending={isPending}
      fileInputRef={fileInputRef}
      handleResetBlog={handleResetBlog}
      coverImagePreview={coverImagePreview}
      handleContainerClick={handleContainerClick}
      handleCoverImageChange={handleCoverImageChange}
    />
  );
};
