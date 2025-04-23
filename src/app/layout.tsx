import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { auth } from '@/features/auth/server/next-auth-config';
import { SessionProvider } from 'next-auth/react';

import Script from 'next/script';
import { Toaster } from '@/components/ui/toaster';
import { ToastProvider } from '@/components/ui/toast';

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import '@/styles/globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  preload: true,
  display: 'swap', // Optimize font loading strategy
  variable: '--jakartaSans-font',
});

const inter = Inter({
  subsets: ['latin'],
  preload: true,
  display: 'swap', // Optimize font loading strategy
  variable: '--inter-font',
});

export const metadata: Metadata = {
  title: 'Entomon Institute of Invertebrates Zoology',
  description: 'Welcome to Entomon Institute - Igniting Curiosity, Empowering Minds!!!',
  // Add more metadata to improve SEO
  metadataBase: new URL('https://entomon-institute.com'),
  verification: {
    google: 'google-site-verification=your-code-here', // Add your verification code when you have it
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <html lang="en">
        <ToastProvider>
          <body className={`${plus_jakarta_sans.className} ${inter.className}`} suppressHydrationWarning={true}>
            <Analytics />
            <SpeedInsights />
            <Toaster />
            {children}
          </body>
        </ToastProvider>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    </SessionProvider>
  );
}
