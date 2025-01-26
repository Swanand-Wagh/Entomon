'use client';

import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Toolbar } from './Toolbar';

export const RichTextEditor = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-lg border bg-white p-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="h-[calc(100vh-15rem)] overflow-y-scroll p-2" />

      <div className="mt-2 text-right text-xs text-gray-500">
        Characters: {editor.storage.characterCount.characters()}; Words: {editor.storage.characterCount.words()}
      </div>
    </div>
  );
};
