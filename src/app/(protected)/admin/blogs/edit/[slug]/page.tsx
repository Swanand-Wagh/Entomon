import React from 'react';

const EditBlog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return <>{slug}</>;
};

export default EditBlog;
