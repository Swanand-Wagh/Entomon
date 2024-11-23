import React from 'react';

import Home from '@/modules/home';
import { Navbar, Footer } from '@/common/components/custom';

export const dynamic = 'force-static';
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;
