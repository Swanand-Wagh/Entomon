import React, { Suspense } from 'react';
import { CreateUpdateBlog } from '@/modules/admin';
import { Loading } from '@/common/components/custom';

const CreateUpdateBlogPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CreateUpdateBlog data={null} />
      </Suspense>
    </>
  );
};

export default CreateUpdateBlogPage;
