import React from 'react';
import Image from 'next/image';

import { ContactForm } from './ContactForm';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Wed love to hear from you! Whether you have a question about features, trials, pricing, need a demo, or
            anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              width={600}
              height={400}
              alt="Contact Us"
              className="rounded-lg shadow-lg"
              src="https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
