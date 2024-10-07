import React, { Suspense } from 'react';

import { Login } from '@/modules/auth';

const LoginPage = () => {
  return (
    <>
      <Suspense>
        <Login />
      </Suspense>
    </>
  );
};

export default LoginPage;
