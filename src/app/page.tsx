import React, { Suspense } from 'react';

import { Home } from '@/features/home/components';
import { Navbar, Footer, Loading } from '@/components/custom';

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
