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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/common/schemas/blogSchema';
import { BlogForm } from './BlogForm';

export const CreateUpdateBlog = ({ slug }: { slug: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      coverImage: '',
      categories: [],
      isPaid: false,
      content: { type: 'doc', content: [{ type: 'paragraph' }] },
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
    content: '',
    onUpdate: ({ editor }) => {
      form.setValue('content', editor.getJSON());
    },
  });

  const handleResetBlog = () => {
    form.clearErrors();
    form.reset();
    editor?.commands.clearContent();
    setCoverImagePreview(null);
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
      form.setValue('coverImage', file);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: z.infer<typeof blogSchema>) => {
    setError('');
    setSuccess('');
    console.log(values);
    startTransition(() => {});
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
