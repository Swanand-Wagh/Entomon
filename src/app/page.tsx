import React from 'react';

import Home from '@/modules/home';
import { Navbar, Footer } from '@/common/components/custom';

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
