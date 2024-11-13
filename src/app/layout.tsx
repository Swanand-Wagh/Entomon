import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import { Toaster } from '@/common/components/ui/toaster';
import { ToastProvider } from '@/common/components/ui/toast';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import '@/common/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'], preload: true });
const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'Entomon Institute of Invertebrates Zoology',
  description: 'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <ToastProvider>
          <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
            <Toaster />
            <MantineProvider>{children}</MantineProvider>
          </body>
        </ToastProvider>
      </html>
    </SessionProvider>
  );
}
