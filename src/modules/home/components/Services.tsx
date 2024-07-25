import { ArchiveIcon, BackpackIcon, CalendarIcon } from '@radix-ui/react-icons';

export const SERVICES = [
  {
    id: 1,
    title: 'Academic Programs',
    description: 'Undergraduate and graduate degree programs in invertebrate zoology, marine biology, and entomology.',
    Icon: ArchiveIcon,
  },
  {
    id: 2,
    title: 'Research Opportunities',
    description:
      'Cutting-edge research projects and collaborations in areas like biodiversity, conservation, and evolutionary biology.',
    Icon: BackpackIcon,
  },
  {
    id: 3,
    title: 'Outreach Programs',
    description:
      'Public lectures, workshops, and community engagement initiatives to promote invertebrate education and awareness.',
    Icon: CalendarIcon,
  },
];

export const Services = () => (
  <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">What We Offer</h2>
        <p className="max-w-xl mx-auto text-muted-foreground">
          Explore our diverse range of programs, courses, and research opportunities at the Entomon Institute.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ id, title, description, Icon }) => (
          <div key={id} className="bg-background rounded-lg p-6 shadow-sm">
            <Icon className="w-8 h-8 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
