import React from 'react';
import Image from 'next/image';
import { BlogFormValues } from '@/common/schemas/blogSchema';

type ViewBlogProps = {
  data: BlogFormValues | null;
};

export const ViewBlog = ({ data }: ViewBlogProps) => {
  if (!data) {
    return <div>No blog data available.</div>;
  }

  const { title, slug, coverImage, categories, isPaid, content } = data;

  return (
    <div className="mx-auto my-8 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      {/* Cover Image */}
      {coverImage && (
        <div className="mb-4">
          <Image
            alt={title}
            width={400}
            height={200}
            src={coverImage}
            className="absolute inset-0 rounded-lg object-cover"
          />
        </div>
      )}

      {/* Title and Meta Information */}
      <h1 className="mb-2 text-3xl font-bold">{title}</h1>
      <p className="mb-4 text-sm text-gray-500">Slug: {slug}</p>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Categories:</h2>
          <ul className="list-inside list-disc">
            {Array.isArray(categories)
              ? categories.map((category, index) => (
                  <li key={index} className="text-gray-700">
                    {category}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}

      {/* Paid Indicator */}
      <p className="mb-4">
        <strong>Paid Content:</strong>{' '}
        <span className={isPaid ? 'text-green-500' : 'text-red-500'}>{isPaid ? 'Yes' : 'No'}</span>
      </p>

      {/* Content */}
      <div className="prose prose-lg">
        <h2 className="mb-2 text-lg font-semibold">Content:</h2>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose prose-sm md:prose-lg lg:prose-xl max-w-none"
        />
      </div>
    </div>
  );
};
