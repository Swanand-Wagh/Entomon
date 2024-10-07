import React, { Suspense } from 'react';

import { Register } from '@/modules/auth';

const RegisterPage = () => {
  return (
    <>
      <Suspense>
        <Register />
      </Suspense>
    </>
  );
};

export default RegisterPage;
