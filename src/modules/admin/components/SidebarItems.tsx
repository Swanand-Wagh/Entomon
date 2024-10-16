import { ICONS } from '@/common/constants/icons';

export type NavItem = {
  title: string;
  label?: string;
  icon: keyof typeof ICONS;
  route?: string;
  children?: ChildNavItem[];
};

export type ChildNavItem = {
  title: string;
  label?: string;
  route: string;
};

export type NavHeader = {
  heading: string;
};

export type SidebarItem = NavItem | NavHeader;

export const sidebarItems: SidebarItem[] = [
  { heading: 'Overview' },
  {
    title: 'Dashboard',
    icon: 'hamburger',
    route: '/admin/dashboard',
  },
  { heading: 'Apps & Pages' },
  {
    title: 'Blogs',
    icon: 'blog',
    route: '/admin/blogs',
  },
  {
    title: 'Courses',
    icon: 'course',
    route: '/admin/courses',
  },
  {
    title: 'Events',
    icon: 'event',
    route: '/admin/events',
  },
  { heading: 'User Settings' },
  {
    title: 'Users',
    icon: 'user',
    route: '/admin/users',
  },
  {
    title: 'Analytics',
    icon: 'analytics',
    route: '/admin/analytics',
  },
  {
    title: 'Settings',
    icon: 'settings',
    route: '/admin/settings',
  },
  // {
  //   title: 'Notifications',
  //   icon: 'bell',
  //   children: [{ title: 'Emails', route: '/admin/notifications/' }],
  // },
];
