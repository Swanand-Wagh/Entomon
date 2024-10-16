import type { Metadata } from 'next';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import { Toaster } from '@/common/components/ui/sonner';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/common/styles/globals.css';

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
        <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
