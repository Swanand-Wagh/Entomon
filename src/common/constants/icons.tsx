import React from 'react';
import { SiGmail, SiLinkedin } from 'react-icons/si';
import { FaFacebookSquare } from 'react-icons/fa';
import { IoMenu, IoChevronDown, IoSearch, IoCalendar, IoLogoGoogle } from 'react-icons/io5';

interface IconProps {
  name: string;
  className?: string;
}

export const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  gmail: SiGmail,
  linkedin: SiLinkedin,
  facebook: FaFacebookSquare,
  hamburger: IoMenu,
  chevronDown: IoChevronDown,
  search: IoSearch,
  calendar: IoCalendar,
  google: IoLogoGoogle,
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const Component = ICONS[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component className={className} />;
};
