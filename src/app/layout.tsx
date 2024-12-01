import type { Metadata } from 'next';

import { auth } from '@/auth';
import { SessionProvider } from '@/common/components/providers/SessionProvider';

import { Toaster } from '@/common/components/ui/toaster';
import { ToastProvider } from '@/common/components/ui/toast';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/common/styles/globals.css';
import { Session } from 'next-auth';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  preload: true,
});
const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
  title: 'Entomon Institute of Invertebrates Zoology',
  description: 'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds!',
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <ToastProvider>
          <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
            <Toaster />
            {children}
          </body>
        </ToastProvider>
      </html>
    </SessionProvider>
  );
}
