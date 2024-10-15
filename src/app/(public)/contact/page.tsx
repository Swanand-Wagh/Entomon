import React from 'react';

import Contact from '@/modules/contact';
import { Navbar, Footer } from '@/common/components/custom';

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
