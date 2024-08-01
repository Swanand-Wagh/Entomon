import React from 'react';

import Contact from '@/modules/contact';
import { Navbar } from '@/common/components/custom/Navbar';
import { Footer } from '@/common/components/custom/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
