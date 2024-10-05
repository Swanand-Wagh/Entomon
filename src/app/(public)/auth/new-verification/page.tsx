import React, { Suspense } from 'react';

import { NewVerification } from '@/modules/auth';

const NewVerificationPage = () => {
  return (
    <>
      <Suspense>
        <NewVerification />
      </Suspense>
    </>
  );
};

export default NewVerificationPage;
