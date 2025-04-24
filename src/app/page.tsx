import React, { Suspense } from 'react';
import type { Metadata } from 'next';

import { Home } from '@/features/home/components';
import { Navbar, Footer, Loading } from '@/components/custom';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Entomon Institute - Discover the Fascinating World of Invertebrate Zoology and Entomology',
  keywords: ['Entomon', 'Home', 'Entomology', 'Invertebrate Zoology', 'Insect Studies'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Entomon Institute of Invertebrates Zoology',
    description: 'Discover the Fascinating World of Invertebrate Zoology and Entomology',
    url: '/',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Entomon Institute Home Page',
      },
    ],
  },
};

const HomeContent = () => {
  return <Home />;
};

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <HomeContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default HomePage;
