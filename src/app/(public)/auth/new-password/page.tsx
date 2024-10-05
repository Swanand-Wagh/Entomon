import React, { Suspense } from 'react';

import { NewPassword } from '@/modules/auth';

const NewPasswordPage = () => {
  return (
    <>
      <Suspense>
        <NewPassword />
      </Suspense>
    </>
  );
};

export default NewPasswordPage;
