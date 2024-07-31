import { InstagramLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BugIcon } from './BugIcon';

export const FOOTER_LINKS = [
  { id: 1, href: '/about', label: 'About' },
  { id: 2, href: '/events', label: 'Events' },
  { id: 3, href: '/resources', label: 'Resources' },
  { id: 4, href: '/contact', label: 'Contact' },
];

export const SOCIAL_LINKS = [
  { id: 1, href: 'mailto:entomoninstitute@gmail.com', icon: <EnvelopeClosedIcon className="w-5 h-5" /> },
  { id: 2, href: '#', icon: <InstagramLogoIcon className="w-5 h-5" /> },
  { id: 3, href: 'https://www.linkedin.com/company/entomon-institute', icon: <LinkedInLogoIcon className="w-5 h-5" /> },
];

export const Footer = () => (
  <footer className="w-full bg-muted py-6 md:py-8 lg:py-10">
    <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <BugIcon className="w-6 h-6 text-primary" />
        <nav className="flex gap-4 sm:gap-6">
          {FOOTER_LINKS.map(({ id, href, label }) => (
            <Link
              key={id}
              href={href}
              prefetch={false}
              rel="noopener noreferrer"
              className="text-sm hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ id, href, icon }) => (
          <Link
            key={id}
            href={href}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            {icon}
          </Link>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        &copy; 2024 Entomon Institute of Invertebrates Zoology. All rights reserved.
      </p>
    </div>
  </footer>
);
