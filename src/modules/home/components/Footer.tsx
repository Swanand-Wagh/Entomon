import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BugIcon } from './BugIcon';

export const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export const SOCIAL_LINKS = [
  { href: '#', icon: <TwitterLogoIcon className="w-5 h-5" /> },
  { href: '#', icon: <InstagramLogoIcon className="w-5 h-5" /> },
  { href: '#', icon: <LinkedInLogoIcon className="w-5 h-5" /> },
];

export const Footer = () => (
  <footer className="w-full bg-muted py-6 md:py-8 lg:py-10">
    <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <BugIcon className="w-6 h-6 text-primary" />
        <nav className="flex gap-4 sm:gap-6">
          {FOOTER_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm hover:underline underline-offset-4" prefetch={false}>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ href, icon }) => (
          <Link key={href} href={href} className="text-muted-foreground hover:text-foreground" prefetch={false}>
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
