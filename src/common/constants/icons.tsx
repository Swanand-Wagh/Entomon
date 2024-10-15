import React from 'react';

import {
  IoMenu,
  IoSearch,
  IoCalendar,
  IoLogoGoogle,
  IoChevronDown,
  IoChevronBack,
  IoSettingsSharp,
  IoWarningOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { FaFacebookSquare, FaUserNinja, FaBlog } from 'react-icons/fa';
import { SiGmail, SiLinkedin, SiGoogleanalytics } from 'react-icons/si';
import { MdErrorOutline, MdMenuBook, MdEventNote } from 'react-icons/md';

interface IconProps {
  name: keyof typeof ICONS;
  className?: string;
}

export const ICONS = {
  blog: FaBlog,
  gmail: SiGmail,
  search: IoSearch,
  hamburger: IoMenu,
  user: FaUserNinja,
  course: MdMenuBook,
  event: MdEventNote,
  linkedin: SiLinkedin,
  calendar: IoCalendar,
  google: IoLogoGoogle,
  error: MdErrorOutline,
  warning: IoWarningOutline,
  settings: IoSettingsSharp,
  facebook: FaFacebookSquare,
  chevronDown: IoChevronDown,
  chevronBack: IoChevronBack,
  analytics: SiGoogleanalytics,
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
