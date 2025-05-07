'use client';

import React, { useMemo } from 'react';
import { EventWithoutDescriptionType } from '../types/event';
import { useSearchParams } from 'next/navigation';
import { categoryFilterList, priceFilterList } from '@/constants/filterLists';
import { FilterList } from '@/features/blog/components/FilterList';
import { CategoriesFilterList, PriceFilterList } from '@/features/blog/types/blog';
import { RenderPagination } from '@/components/custom/RenderPagination';
import { EventList } from './EventList';

type EventListProps = {
  readonly events: EventWithoutDescriptionType[];
};

export const CATEGORY_QUERY_KEY = 'category';
export const PRICE_QUERY_KEY = 'price';
export const ITEMS_PER_PAGE = 12;

export const EventListLayout = ({ events }: EventListProps) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(CATEGORY_QUERY_KEY) ?? "all";
  const currentPrice = searchParams.get(PRICE_QUERY_KEY) ?? "all";

  const filteredEvents = useMemo(() => {
    if (!currentCategory || !currentPrice) return events;
    if (currentCategory === 'all' && currentPrice === 'all') return events;

    return events.filter((d) => {
      const isPaid = parseInt(d.price) > 0;

      if (currentCategory === 'all') return isPaid === (currentPrice === 'paid');
      if (currentPrice === 'all') return d.categories.includes(currentCategory);

      return d.categories.includes(currentCategory) && isPaid === (currentPrice === 'paid');
    });
  }, [events, currentCategory, currentPrice]);

  return (
    <React.Fragment>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="p-2 text-3xl font-bold tracking-tight">Events</h2>
        <div className="flex items-center gap-4">
          <FilterList<Omit<PriceFilterList, 'checked'>>
            allSelectionText="All Prices"
            queryKey={PRICE_QUERY_KEY}
            filterListItems={priceFilterList}
          />
          <FilterList<Omit<CategoriesFilterList, 'checked'>>
            allSelectionText="All Categories"
            queryKey={CATEGORY_QUERY_KEY}
            filterListItems={categoryFilterList}
          />
        </div>
      </div>
      <EventList events={filteredEvents ?? []} />
      <div className="">
        <RenderPagination totalItems={filteredEvents.length} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </React.Fragment>
  );
};
