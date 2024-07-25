import React from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Newsletter } from './NewsLetter';
import { UpcomingEvents } from './UpcomingEvents';
import { About } from './About';
import { Services } from './Services';
import { Hero } from './Hero';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <UpcomingEvents />
      <Newsletter />
      <Footer />
    </>
  );
};
