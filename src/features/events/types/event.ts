export type EventDataType = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  coverImage: string;
  price: string;
  categories: string[];
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  slug: string;
  createdAt: string;
  updatedAt: string;
};
