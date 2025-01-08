import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { Badge } from '@/components/ui/badge';
import { EventDataType } from '../types/event';
import { RegistrationForm } from './RegistrationForm';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

type SingleEventProps = {
  data: EventDataType | null;
};

export const SingleEvent = async ({ data }: SingleEventProps) => {
  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Error Loading Event Post</h1>
        <p>
          We&apos;re sorry, but we couldn&apos;t load the event data or probably it doesn&apos;t exist. <br />
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <article className="w-full bg-muted py-6 md:py-8 lg:py-10">
      <div className="container gap-4 px-4 md:flex-row md:px-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="mb-4 text-4xl font-bold">{data.title}</h1>
            {data.price ? (
              <Badge variant="destructive" className="mb-4">
                {data.price}
              </Badge>
            ) : (
              <Badge variant="default" className="mb-4">
                Free Content
              </Badge>
            )}
          </div>

          <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
            <span>By Entomon Institute</span>
            <span>
              {data.updatedAt
                ? `Updated ${new Date(data.updatedAt).toLocaleDateString()}`
                : `Published ${new Date(data.createdAt).toLocaleDateString()}`}
            </span>
          </div>

          <div className="mb-4 flex gap-2">
            {data.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </header>

        <div className="flex gap-8">
          <div className="basis-4/6">
            {data.coverImage && (
              <Image
                width={1200}
                height={630}
                alt={data.title}
                src={data.coverImage}
                className="mb-8 aspect-video w-full rounded-lg object-cover"
              />
            )}

            <div
              className="prose mb-12 max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
            />
          </div>

          <div className="basis-2/6">
            <div className="mb-2 flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(data.date).toDateString()}
            </div>
            <div className="mb-8  flex items-center text-sm text-gray-500">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <Link target="_blank" href="/">
                {data.location}
              </Link>
            </div>

            <RegistrationForm />
          </div>
        </div>
      </div>
    </article>
  );
};
