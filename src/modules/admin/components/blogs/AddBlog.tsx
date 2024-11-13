'use client';

import { useState, useTransition } from 'react';
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
import { TextEditor } from '@/common/components/custom/editor';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/common/schemas/blogSchema';
import { FormError, FormSuccess } from '@/common/components/custom';
import { Form, FormControl, FormField, FormItem } from '@/common/components/ui/form';

export const AddBlog = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: { type: 'doc', content: [{ type: 'paragraph' }] },
    },
  });

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link,
      Highlight,
      Image,
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
        className="flex h-screen w-full flex-col items-center gap-4 overflow-hidden"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-11/12 rounded-md border">
              <FormControl>
                <Input {...field} type="text" disabled={isPending} placeholder="Blog Title" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-11/12 rounded-md border">
              <FormControl>
                <Input {...field} type="text" disabled={isPending} placeholder="Slug" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-11/12">
          <TextEditor editor={editor} />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="flex w-11/12 gap-4">
          <Button
            onClick={handleResetBlog}
            className="flex-1 rounded-md bg-red-200 p-2 font-semibold text-black hover:bg-red-100"
          >
            Reset
          </Button>
          <Button type="submit" className="rounded-mdp-2 flex-1 font-semibold text-white">
            Create Blog
          </Button>
        </div>
      </form>
    </Form>
  );
};
