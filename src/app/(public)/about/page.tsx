import type { Metadata } from 'next';
import Image from 'next/image';

import bugImage from '@/assets/hero-img.webp';
import { BugIcon } from '@/components/custom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the Entomon Institute, our mission, team, and commitment to invertebrate zoology and entomology research.',
  keywords: ['About Entomon', 'Entomology Research', 'Invertebrate Specialists', 'Entomon Team', 'Entomon Mission'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Entomon Institute',
    description:
      'Dedicated to advancing the understanding of invertebrate life through research, education, and conservation.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'About Entomon Institute',
      },
    ],
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Eshaan Pahade',
      role: 'Director & CEO',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=EshaanPahade',
    },
    {
      name: 'Mrs. Shreya Pahade',
      role: 'Head of Research',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=ShreyaPahade',
    },
  ];

  const faqs = [
    {
      question: 'What is entomology, and why is it important?',
      answer:
        'Entomology is the scientific study of insects and their relationships to humans, other organisms, and the environment. Insects are vital to ecosystems as pollinators, decomposers, and as a food source for many species. They also play an essential role in agricultural systems, disease transmission, and biodiversity conservation. Understanding insects is key to solving environmental, health, and agricultural challenges.',
    },
    {
      question: 'What kind of research does the Entomon Institute conduct?',
      answer:
        'The Entomon Institute specializes in advanced entomological research across various fields, including insect behavior, biodiversity, pest management, and conservation. Our research projects also explore the impact of climate change on insect populations, vector-borne diseases, and the role of insects in ecosystems.',
    },
    {
      question: 'Do you offer educational programs or workshops?',
      answer:
        'Yes! We offer a range of educational programs, including workshops, short courses, and online seminars on various aspects of entomology. These programs are designed for students, researchers, and professionals looking to deepen their understanding of insect science, biodiversity, and sustainable pest management practices.',
    },
    {
      question: 'Can I participate in entomological experiments at the Entomon Institute?',
      answer:
        'Yes, we invite collaboration and participation in various entomological experimentation projects. Depending on the nature of the project, we offer opportunities for students, researchers, and industry professionals to get involved, either as volunteers, research assistants, or in partnership with us on applied projects',
    },
    {
      question: 'What types of entomological experiments do you conduct?',
      answer:
        'Our experiments cover a wide range of entomological topics, including insect life cycles, behavior studies, genetic research, ecological surveys, pest control methods, and conservation efforts. We also conduct trials on new agricultural treatments to protect crops from pests while minimizing environmental impact.',
    },
    {
      question: 'How can I collaborate with the Entomon Institute on a research project?',
      answer:
        'We welcome collaboration with institutions, universities, and industry professionals. If you\'re interested in partnering on research, please reach out through our contact page with your proposal, including a brief description of the project, objectives, and any specific areas where you\'d like to collaborate. Our team will get back to you to discuss the potential for joint research',
    },
    {
      question: 'How can I support the work of the Entomon Institute?',
      answer:
        'Your support helps us further our mission in advancing entomological research and education. You can support the Entomon Institute by donating, sponsoring educational programs, or volunteering your time or expertise. Please visit our "Contact Us" page and contact the admin for more information on how you can contribute to our work.',
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Mission</h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-700">
                At the Entomon Institute, we are dedicated to advancing the understanding of invertebrate life through
                cutting-edge research, education, and conservation efforts. Our mission is to:
              </p>
              <ul className="grid gap-3 text-gray-700 xs:grid-cols-2">
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Conduct groundbreaking research in invertebrate zoology
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Educate the next generation of invertebrate specialists
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Promote the conservation of invertebrate species and their habitats
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Foster public appreciation for the vital role of invertebrates in our world
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src={bugImage}
                alt="Entomon Institute building"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member, index) => (
              <div key={crypto.randomUUID()} className="rounded-md bg-gray-200/35 px-3 py-5 text-center">
                <Image
                  width={150}
                  height={150}
                  alt={member.name}
                  src={member.image}
                  className="mx-auto mb-4 rounded-full"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
}
