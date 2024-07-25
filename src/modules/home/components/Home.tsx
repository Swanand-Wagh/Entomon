import React from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Newsletter } from './NewsLetter';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Newsletter />
      <Footer />
    </>
  );
};
