import React from 'react';
import { SiGmail, SiLinkedin } from 'react-icons/si';
import { FaFacebookSquare, FaUserNinja } from 'react-icons/fa';
import {
  IoMenu,
  IoSearch,
  IoCalendar,
  IoLogoGoogle,
  IoChevronDown,
  IoSettingsSharp,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';

interface IconProps {
  name: keyof typeof ICONS;
  className?: string;
}

export const ICONS = {
  gmail: SiGmail,
  search: IoSearch,
  hamburger: IoMenu,
  user: FaUserNinja,
  linkedin: SiLinkedin,
  calendar: IoCalendar,
  google: IoLogoGoogle,
  error: MdErrorOutline,
  warning: IoWarningOutline,
  settings: IoSettingsSharp,
  facebook: FaFacebookSquare,
  chevronDown: IoChevronDown,
  check: IoCheckmarkCircleOutline,
} as const;

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const Component = ICONS[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <Component className={className} />;
};
