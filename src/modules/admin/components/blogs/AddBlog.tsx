'use client';

import { useRef, useState, useTransition } from 'react';
import NextImage from 'next/image';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';

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
import { TextEditor } from '@/common/components/custom/editor';

import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/common/schemas/blogSchema';
import { FormError, FormSuccess } from '@/common/components/custom';
import { Form, FormControl, FormField, FormItem } from '@/common/components/ui/form';
import { CustomMultiSelect } from '@/common/components/custom/MultiSelect';

const blogCategories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Lifestyle' },
  { id: '3', name: 'Education' },
  { id: '4', name: 'Health' },
  { id: '5', name: 'Business' },
];

export const AddBlog = () => {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-screen w-full flex-col items-center gap-3 overflow-hidden"
      >
        <div className="flex w-full gap-8">
          <div className="flex w-1/4 flex-col gap-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="rounded-md border-gray-300">
                    <Input {...field} type="text" disabled={isPending} placeholder="Blog Title" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="rounded-md border-gray-300">
                    <Input {...field} type="text" disabled={isPending} placeholder="Slug" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="categories"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="rounded-md border-gray-300">
                    <CustomMultiSelect field={field} data={blogCategories} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Cover Image Section */}
            <div
              onClick={handleContainerClick}
              className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              <Controller
                name="coverImage"
                control={form.control}
                render={() => (
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        handleCoverImageChange(e);
                      }}
                    />

                    {coverImagePreview ? (
                      <NextImage
                        width={160}
                        height={160}
                        alt="Cover Preview"
                        src={coverImagePreview}
                        className="absolute inset-0 h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Click to upload cover image</span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Reset and Submit Buttons */}
            <div className="mt-4 flex w-full flex-col gap-2">
              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                onClick={handleResetBlog}
                className="w-full rounded-md bg-red-200 p-2 font-semibold text-black hover:bg-red-100"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="w-full rounded-md bg-blue-600 p-2 font-semibold text-white hover:bg-blue-500"
              >
                Create Blog
              </Button>
            </div>
          </div>

          {/* Text Editor */}
          <div className="w-3/4">
            <TextEditor editor={editor} />
          </div>
        </div>
      </form>
    </Form>
  );
};
