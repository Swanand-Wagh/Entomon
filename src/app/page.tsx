import React from 'react';

import Home from '@/modules/home';
import { Navbar } from '@/common/components/custom/Navbar';
import { Footer } from '@/common/components/custom/Footer';

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
