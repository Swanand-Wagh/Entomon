import React from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}
