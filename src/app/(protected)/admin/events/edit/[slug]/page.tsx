import React from 'react';

import { EditEvent } from '@/features/events/components/EditEvent';
import { getEventBySlug } from '@/features/events/server/actions';

const EditEventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const event = await getEventBySlug({ slug });

  return (
    <>
      <EditEvent data={event?.data!!} />
    </>
  );
};

export default EditEventPage;
