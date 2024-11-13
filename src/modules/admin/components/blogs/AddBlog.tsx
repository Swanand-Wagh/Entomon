'use client';

import { useState } from 'react';
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

export const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

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
  });

  const handleResetBlog = () => {
    setTitle('');
    setSlug('');
    editor?.commands.clearContent();
  };

  return (
    <div className="flex h-screen w-full flex-col items-center gap-4 overflow-hidden">
      <Input
        type="text"
        value={title}
        placeholder="Blog Title"
        onChange={(e) => setTitle(e.target.value)}
        className="text-md w-11/12 rounded-md border border-gray-300 p-2"
      />
      <Input
        type="text"
        value={slug}
        placeholder="Slug"
        onChange={(e) => setSlug(e.target.value)}
        className="w-11/12 rounded-md border border-gray-300 p-2 text-sm"
      />

      <div className="w-11/12">
        <TextEditor editor={editor} />
      </div>

      <div className="flex w-11/12 gap-4">
        <Button
          onClick={handleResetBlog}
          className="flex-1 rounded-md bg-red-200 p-2 font-semibold text-black hover:bg-red-100"
        >
          Reset
        </Button>
        <Button
          onClick={() => console.log('Submit button clicked')}
          className="rounded-mdp-2 flex-1 font-semibold text-white"
        >
          Create Blog
        </Button>
      </div>
    </div>
  );
};
