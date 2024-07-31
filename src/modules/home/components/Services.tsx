import { ArchiveIcon, BackpackIcon, CalendarIcon } from '@radix-ui/react-icons';

export const SERVICES = [
  {
    id: 1,
    title: 'Excursions that Transcend the Classroom',
    description:
      'Embark on a journey beyond textbooks as our expert-led excursions take you into the heart of nature. Witness fascinating ecosystems, observe wildlife in their natural habitats, and gain insights that go far beyond traditional classroom learning.',
    Icon: ArchiveIcon,
  },
  {
    id: 2,
    title: 'Connecting Students with Leading Scientists and Industry Experts',
    description:
      'We understand the importance of mentorship in shaping budding minds. At Entomon Institute, we bridge the gap between students and experts. Our excursions provide unique networking opportunities, allowing students to interact with and learn from seasoned scientists and industry professionals.',
    Icon: BackpackIcon,
  },
  {
    id: 3,
    title: 'Guiding Masters Students to Success',
    description:
      "Elevate your academic journey with our comprehensive guidance for Masters students. Whether you're navigating the world of dissertations, crafting project proposals, or delving into the realm of scientific writing, we're here to support you every step of the way.",
    Icon: CalendarIcon,
  },
  {
    id: 4,
    title: 'Dissertations, Project Proposals, Articles, and Blogs',
    description:
      'Our team of experienced mentors will assist you in honing your writing skills. From structuring your dissertation to crafting compelling articles and blogs, we provide the guidance needed to excel in the world of scientific communication.',
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
